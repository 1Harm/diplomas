import React from "react";
import {
  Button,
  ButtonsRow,
  Container,
  Icon,
  Panel,
  PanelContent,
  PanelHeader,
  TextAreaInput,
  WelcomeHeader,
  SettingsModal,
  Dashboard,
  ButtonIcon,
  TextInput,
  ButtonLink,
  UploadDatasetButton,
  ViewSelect,
  OpenAIErrorMessage,
  EmptyMessage,
  DataLoadedMessage,
  MissingApiKeyMessage,
} from "../components/index.jsx";
import { Loader } from "../components/layout/Loader.jsx";
import { Table } from "../components/layout/Table.tsx";
import { generateDashboard, generatePrompt } from "../openai/analyze.ts";
import { getRandomDataset, sample } from "../openai/sample.ts";
import { IDashboard, IDataset, ISettings } from "../types.tsx";
import { isDataValid, parseData, stringifyData } from "../utils/parseData.ts";
import gtag from "../lib/gtag.ts";

export default function DropFile() {
  const [view, setView] = React.useState("dashboard");

  const [settings, setSettings] = React.useState<ISettings>({
    apikey: "",
    sampleRows: 10,
    model: "",
  });
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState<IDataset>();
  const [userContext, setUserContext] = React.useState<string>("");

  const [currentSampleIndex, setCurrentSampleIndex] = React.useState(-1);
  const [dashboard, setDashboard] = React.useState<IDashboard | null>();
  const [showSettings, setShowSettings] = React.useState(false);

  React.useEffect(() => {
    const config = localStorage.getItem("analyzer-settings");
    if (config) {
      setSettings(JSON.parse(config) as ISettings);
    }

    const { data, dashboard, context, index } = getRandomDataset(-1);
    setData(parseData(data));
    setDashboard(dashboard);
    setUserContext(context);
    setCurrentSampleIndex(index);
  }, []);

  const handleAnalyze = React.useCallback(() => {
    if (!settings.apikey) {
      setShowSettings(true);
    } else if (data) {
      setLoading(true);
      generateDashboard(
        data,
        userContext,
        settings.sampleRows,
        settings.apikey,
        settings.model
      )
        .then((response) => {
          setDashboard(response.dashboard);
          setLoading(false);
        })
        .catch((err) => {
          setDashboard(null);
          setLoading(false);
        });
    }
  }, [data, userContext, settings]);

  const handleRandomDataset = React.useCallback(() => {
    const { data, dashboard, context, index } =
      getRandomDataset(currentSampleIndex);
    setData(parseData(data));
    setDashboard(dashboard);
    setUserContext(context);
    setCurrentSampleIndex(index);
  }, [currentSampleIndex]);

  // console.log(dashboard, stringifyData(data || []));

  const handleClear = React.useCallback(() => {
    setData(undefined);
    setDashboard(null);
    setUserContext("");
  }, []);

  const handleSettingsChange = React.useCallback((settings: ISettings) => {
    localStorage.setItem("analyzer-settings", JSON.stringify(settings));
    setSettings(settings);
    setShowSettings(false);
  }, []);

  const handleShowSettings = React.useCallback(() => {
    setShowSettings(true);
  }, []);

  const handleCloseSettings = React.useCallback(() => {
    setShowSettings(false);
  }, []);

  const handleDatasetChange = React.useCallback((dataset: string) => {
    gtag.report("event", "upload_data", {
      event_category: "settings",
      event_label: "uploaded",
    });
    setData(parseData(dataset));
    setDashboard(null);
  }, []);

  const handleClick = React.useCallback(() => {
    setUserContext(" ");
  }, []);

  const handleClearContext = React.useCallback(() => {
    setUserContext("");
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <>
        <Container>
          <Panel>
            <PanelHeader>
              <WelcomeHeader
                title="AI Data Dashboard"
                subtitle={
                  <>
                    Upload your CSV dataset or{" "}
                    <ButtonLink onClick={handleRandomDataset} accent="BRAND">
                      try it with random data.
                    </ButtonLink>
                  </>
                }
              />
              <ButtonIcon icon="cog" onClick={handleShowSettings} />
              {showSettings && (
                <SettingsModal
                  value={settings}
                  onChange={handleSettingsChange}
                  onCancel={handleCloseSettings}
                />
              )}
              <ButtonsRow>
                <UploadDatasetButton onUpload={handleDatasetChange} />
                <Button
                  className="trash"
                  disabled={!data}
                  outline
                  onClick={handleClear}
                >
                  <Icon icon="thrash" /> Clear
                </Button>
                <Button
                  className="analyze"
                  disabled={!data && !!settings?.apikey}
                  onClick={handleAnalyze}
                >
                  {settings?.apikey && dashboard && data ? (
                    <Icon icon="arrow" />
                  ) : null}{" "}
                  {(() => {
                    if (!settings.apikey) return "Set up your API KEY";
                    return dashboard && data ? "Re-analyze" : "Analyze";
                  })()}
                </Button>
              </ButtonsRow>

              {userContext ? (
                <TextInput
                  type="textarea"
                  label={
                    <>
                      Context about the data
                      <ButtonIcon icon="thrash" onClick={handleClearContext} />
                    </>
                  }
                  value={userContext}
                  onChange={setUserContext}
                />
              ) : (
                <ButtonLink onClick={handleClick}> + Add Context</ButtonLink>
              )}
            </PanelHeader>
            <PanelContent></PanelContent>
          </Panel>
          <Panel>
            <PanelContent>
              <ViewSelect value={view} onChange={setView} />
              {!settings.apikey && !data && !dashboard ? (
                <MissingApiKeyMessage
                  onApiKeyClick={handleShowSettings}
                  onRandomData={handleRandomDataset}
                />
              ) : null}
              {settings.apikey && !data && !dashboard ? (
                <EmptyMessage
                  onRandomData={handleRandomDataset}
                  onUpload={handleDatasetChange}
                />
              ) : null}
              {settings.apikey && data && !dashboard ? (
                <DataLoadedMessage onAnalyze={handleAnalyze} />
              ) : null}
              {dashboard && data && view === "dashboard" ? (
                <Dashboard data={data} dashboard={dashboard} />
              ) : null}
            </PanelContent>
          </Panel>
        </Container>
        {loading && <Loader />}
      </>
    </div>
  );
}
