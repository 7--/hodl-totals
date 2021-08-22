# HODL Totals [![Node.js CI](https://github.com/dogracer/hodl-totals/actions/workflows/node.js.yml/badge.svg)](https://github.com/dogracer/hodl-totals/actions/workflows/node.js.yml) [![Coverage Status](https://coveralls.io/repos/github/dogracer/hodl-totals/badge.svg)](https://coveralls.io/github/dogracer/hodl-totals) [![Discord](https://img.shields.io/discord/591914197219016707.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/TWuA9DzZth) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) [![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp) [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)

Your crypto data is yours to keep; I built this so that you could own your data and manage the data in a convienent way without a need to send your coin data to anyone else.

These Google Apps Scripts will add menu commands to Google Sheets that will help you track cost basis and long-term or short-term treatment for your cryptocurrency trades. 

It uses the first-in, first-out (FIFO) cost method, which is commonly used for tax compliance.

## Use

Options for getting started:

OPTION 1 - Wait until the Google Workspace Marketplace approves this as an Add-on, and then download it from within Google Sheets

OPTION 2 - [Install](#install) the scripts from GitHub into your own new sheet following the [Installation steps]

COMING SOON - Free Training Videos!

## Install

📝 Steps required to run unit tests locally with `npm build`, `npm run test:unit`

> Install nvm (Node Version Manager)
>
> `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`
>
> Install node.js, built for most recent [Long-Term Support version](https://nodejs.org/en/about/releases/)
> 
> `nvm install --lts`
>
> Install HODL Totals dependencies
>
> `npm install`

📝 Additional steps to set up a new Google sheet with HODL totals scripts

> Install [Google clasp](https://github.com/google/clasp), grant clasp access to your google account, create a sheet and push HODL Totals scripts to that sheet
>
> `npm install -g @google/clasp`
> 
> `clasp login` and then grant access in the browser window that opens
>
> `clasp create "<desired sheet name>"` and then select Sheet as doc type to create
>
> `clasp open` and then navigate in browser to the overview page, click link under Project Details>Container to access your sheet

📝 Additional steps to enable End-to-End integration tests to run on your copy of the code, using your Google account on your sheet

> `clasp open` and then navigate in browser, click Deploy dropdwn, select Test Deployment, copy deployment ID out of the webapp URL
>
> `code package.json` to edit package.json locally, paste deploymentID over the test:e2e cmd's deployment ID
> 
> `npm run test:e2e` to run the E2E test suite -- or simply `npm test` to run both local and E2E test suites

## Development Environment

- Windows 10 PC with WSL2 (Ubuntu 20.04.1 LTS)
- Node.js LTS version (14.x or later)
- Visual Studio Code on Windows 10, and its WSL2 integration for editing code stored in WSL
- GitHub CLI commands via the WSL2 Linux terminal
- Publish changes to your google sheet [using clasp](https://developers.google.com/apps-script/guides/clasp) from the command line

## Changelog
- 08-22-21 - Added a dropdown column to explicitly specify the Fair Market Value calculation strategy.
- 06-03-21 - Ported JS to TypeScript. Tests runs locally, can be debugged using Node.js as well as on Google Servers as Google Apps Script. Code coverage stats published on [coveralls.io](https://coveralls.io/github/dogracer/hodl-totals). Integreated npm script commands for common tasks. Added Continuous Integration, code analysis, and dependabot.
- 04-25-21 - Links out to Policies + Discord. Fixed a wave of Apply Formatting bugs, halfway through my Blocker list for submission to the Google Marketplace.
- 01-23-21 - Addressed a laundry list of cleanup issues, in preparation for inital submission to the Google Marketplace.
- 11-29-20 - Addressed Signficant performance issues for > 1000 purchase transactions (long running script may not finish executing before Google times out the job)
- 08-31-20 - Ported logic from alanhett's VBScript Macros to Google Apps Script for FIFO cost basis calc.

### Disclaimer

* This spreadsheet does not constitute legal or tax advice.  Tax laws and regulations change frequently, and their application can vary widely based on the specific facts and circumstances involved. You are responsible for consulting with your own professional tax advisors concerning specific tax circumstances for your business. I disclaim any responsibility for the accuracy or adequacy of any positions taken by you in your tax returns.*

### About

Did this save you a tax prep headache?

Support development with a BTC donation: [38Ehpz3XutgoVEUZWtrXvrWTLJetkDZF5s](https://www.blockchain.com/btc/address/38Ehpz3XutgoVEUZWtrXvrWTLJetkDZF5s)
or a VRSC donation to DCV@
