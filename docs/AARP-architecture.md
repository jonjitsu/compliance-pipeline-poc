```mermaid
flowchart TD
    %% Dev
    Dev["Developer Push"] --> PR["GitHub Pull Request"]
    PR --> GA["GitHub Actions"]

    subgraph "CI Jobs"
        GA --> Build["Compile & Tests"]
        GA --> Reg["Regulatory-Check Job"]
    end

    %% Reg flow
    Reg -->|diff| Eliza["Eliza RAG Agent"]
    Eliza -->|query| Vec["Vector Store"]
    Vec -->|top-k| Eliza
    Eliza --> Findings["Findings.json + SARIF"]

    Findings --> Rank["Severity Ranker"]
    Rank -->|none-high| Status["✅ PR status"]
    Rank -->|any| Comment["Inline PR Comment"]
    Rank -->|high| Jira["JIRA Ticket(s)"]

    %% Evidence + logs
    GA --> SBOM["Provenance Logs & SBOM"]
    Findings --> Evidence["Signed Evidence Bundle"]
    Evidence --> Dash["Audit Dashboard"]

    %% Deploy + runtime
    GA -->|main & green| Deploy["OIDC Deploy → K8s"]
    Deploy --> RuntimeScan["Runtime Scanner"]
    RuntimeScan --> Reg

    %% Offline ingestion
    subgraph "Policy Ingestion"
        PDFs["OSFI PDFs"] --> Ingest["Vectorise job"]
        Ingest --> Vec
    end

  ```
Text description in @AARP-use-case.md