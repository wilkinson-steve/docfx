// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { workspace, Uri } from "vscode";
import * as path from "path";
import { ContentProvider } from "./contentProvider";

export class TokenTreeContentProvider extends ContentProvider {
    public provideTextDocumentContent(uri: Uri): Thenable<string> {
        return workspace.openTextDocument(Uri.parse(uri.query)).then(document => {
            var jsondata = this._content ? this._content.substring(0, this._content.length - 1) : "";
            const content = [
                "<!DOCTYPE html>",
                "<html>",
                "<head>",
                `<meta http-equiv="Content-type" content="text/html;charset=UTF-8">`,
                `<link rel="stylesheet" type="text/css" href="${this.getMediaPath(`token.css`)}" >`,
                `</head>`,
                `<body><!-- ` + jsondata + `--><!--` + this.port.toString() + `-->`,
                `<div id="body"></div>`,
                `<script type="text/javascript" src="${this.getNodeModulesPath(path.join('jquery', 'dist', 'jquery.min.js'))}"></script>`,
                `<script type="text/javascript" src="${this.getNodeModulesPath(path.join('d3', 'd3.min.js'))}"></script>`,
                `<script type="text/javascript" src="${this.getMediaPath(`constVariable.js`)}"></script>`,
                `<script type="text/javascript" src="${this.getMediaPath(`buildTree.js`)}"></script>`,
                `<script>`,
                `var Jsonstr = document.body.firstChild.nodeValue;`,

                `var treeData = JSON.parse(Jsonstr);`,
                `buildTree("#body" , treeData);`,
                `</script>`,
                `</body>`,
                `</html>`
            ].join("\n");

            return content;
        });
    }
}