import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 Vader extension activated!");
  const provider = new VaderViewProvider(context.extensionUri);
  const providerRegistration = vscode.window.registerWebviewViewProvider(
    "vaderView",
    provider,
    {
      webviewOptions: { retainContextWhenHidden: true },
    }
  );
  console.log("Vader view provider registered.");
  context.subscriptions.push(providerRegistration);
}

class VaderViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    const webview = webviewView.webview;

    webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, "media")],
    };

    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "media", "styles.css")
    );
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, "media", "main.js")
    );

    try {
      webview.html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta
        http-equiv="Content-Security-Policy"
        content="default-src 'none'; 
          img-src ${webview.cspSource} https:; 
          style-src ${webview.cspSource} 'unsafe-inline';
          script-src ${webview.cspSource} 'unsafe-inline';"
      />
      <title>Darth Vader</title>
      <link rel="stylesheet" href="${styleUri}" />
    </head>
    <body>
      <div class="stage">
        <div class="card" id="card">
          <div class="vader">
            <div class="helmet" id="helmet">
              <div class="mask">
                <div class="eyes">
                  <div class="eye"></div>
                  <div class="eye"></div>
                </div>
                <div class="grill"></div>
              </div>
            </div>
            <div class="panel">
              <div class="led red"></div>
              <div
                style="
                  width: 34px;
                  height: 18px;
                  background: #222;
                  border-radius: 6px;
                "
              ></div>
              <div class="led green"></div>
              <div class="led blue"></div>
            </div>
            <div class="arm left">
              <div class="saber-wrap">
                <div class="lightsaber"></div>
              </div>
            </div>
            <div class="arm right"></div>
            <div class="cape"></div>
          </div>

          <div class="bubble" id="bubble">Welcome to the dark side</div>
        </div>
      </div>

      <script src="${scriptUri}"></script>
    </body>
  </html>
</html>
`;
    } catch (error) {
      console.error("Failed to load webview:", error);
      webview.html = this.getFallbackHtml();
    }
  }

  private getFallbackHtml() {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Vader Panel</title>
        </head>
        <body>
          <h1>Welcome to the Dark Side</h1>
          <p>The force is having technical difficulties...</p>
        </body>
      </html>
    `;
  }
}

export function deactivate() {}
