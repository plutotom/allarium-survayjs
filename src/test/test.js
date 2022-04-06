const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto(
  //   "https://stackoverflow.com/questions/54035306/puppeteer-ignores-some-css-rules-to-print-pdf-when-i-used-the-media-print",
  //   {
  //     waitUntil: "networkidle2",
  //   }
  // );

  // create new page
  const newPage = await browser.newPage();
  // add html content to page
  await newPage.setContent(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Capability Assessment Results</title>
            <style>
                /* variables go in here*/
                :root {
                    --color1: #FF764A;
                    --color2: #FFA600;
                    --color3: #F29242;
                    --white: #ffffff;
                    --gray: #f3f3f3;
                    --darkgray: #9e9e9e;
                    --black: #242424;
                }
                /* example of use:
                    body{
                       background-color: var(--color1);
                    }
                */
                body {
                    font-family: 'Open Sans', 'Helvetica Neue', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: var(--black);
                    font-size: 1em;
                }
                p {
                    margin: 0;
                    padding: 4px 0;
                }
                .result-cells {
                    color: var(--white);
                    font-weight: 800;
                }
                .container {
                    width: 960px;
                    margin: 0 auto;
                    /* border: 1px solid #424242; */
                    /* box-shadow: 0 0 5px var(--darkgray); */
                    padding: 3em;
                    padding-bottom: 0;
                }
                .intro-para {
                    line-height: 1.6em;
                    font-weight: 400;
                    margin-bottom: 20px;
                }
                .results-tab{
                    background-color: var(--color1);
                    display: inline-block;
                    padding: 1em 3em;
                    margin-left: -3em;
                    border-top-right-radius: 100px;
                    border-bottom-right-radius: 100px;
                    line-height: 1.3em;
                }
                  /* "Your Results" text */
                h2{
                    font-weight: bold;
                    color: var(--white);
                    font-size: 2em;
                    margin: 0;
                }
                /* TABLE BEGINS HERE */
                .table-results {
                    margin-top: 2em;
                    border: 1px solid gray;
                }
                .border-color{
                    border-bottom: 3px solid #FF764a;

                }
                table {
                    margin: 0 auto;
                    width: 100%;
                    border-collapse: collapse;
                }
                th {
                    padding: 1em 0;
                    font-weight: 400;
                }
                th, td {

                    margin: 0 auto;
                    text-align: center;
                    font-size: 1.5em;
                }

                td:not(:first-child) {
                    color: var(--white);
                    font-weight: 700;
                    font-size: 1.8em;
                }
                .col-1{
                    padding: .8em 1em;
                    font-size: 1.5em;
                    text-align: left;
                    width: 30%;
                    height: 125px;
                }

                .gray-cell{
                    background-color: var(--gray);
                    border: 1px solid white;
                }

                /* TABLE ENDS HERE */
                 /*--------------Table Cell Color Specifics begin Here----------*/
                .Arow {background-color: var(--color2);}
                .Brow {background-color: var(--color3)}
                .Crow {background-color: var(--color3)}
                .Drow {background-color: var(--color1)}
                 /*--------------Table Cell Color Specifics end Here----------*/

                 .logo-row {
                     width: 100%;
                     margin: 3em 0;
                 }
                 div.logo-row img{
                     width: 10%;
                 }

                 .gradient-bottom {
                    background-image: linear-gradient(to right, #F7C35D, #D25B3C);
                    padding: .5em 3em;
                    width: 960px;
                    margin: 0 auto;
                 }

            </style>

    </head>
    <body>

    <div class="container">
        <div>
            <h1>Capability Assessment Results</h1>
        </div>
        <div>
            <p class="intro-para">
                The Measured Capability Assessment is designed to map your current in-house data, measurement and decisioning capabilities to your business objectives. The results below highlight how you scored in each area. The following pages detail the characteristics of brands in each category. At the end of this document, you will the find the Capability Prioritization worksheet, which can be used to set the priorities of our engagement.
            </p>
        </div>
        <div class="results-tab">
            <h2>Your Results</h2>
        </div>

        <div class="table-results">
            <table>
                <!-- Table Row 1 -->
                <tr class="border-color">
                    <th></Br></th>
                    <th class="gray-cell">
                        <p>Contender<br>0%-39%</p>
                    </th>
                    <th class="gray-cell">
                        <p>Challenger
                            <br>40%-64%</p>
                    </th>
                    <th class="gray-cell">
                        <p>Leader
                            <br>65%-89%</p>
                    </th>
                    <th class="gray-cell">
                        <p>Champion
                            <br>90%+</p>
                    </th>
                </tr>
                <!-- Table Row 2 -->
                <tr>
                    <td class="col-1 gray-cell">
                        <p>Centralized Data<br> and BI Reporting</p>
                    </td>
                    <td class="Arow">A1</td>
                    <td>B1</td>
                    <td>C1</td>
                    <td>D1</td>
                </tr>
                <!-- Table Row 3 -->
                <tr>
                    <td class="col-1 gray-cell">
                        <p>Marketing<br> Experimentation</p>
                    </td>
                    <td>A2</td>
                    <td class="Brow">B2</td>
                    <td>C2</td>
                    <td>D2</td>
                </tr>
                <!-- Table Row 4 -->
                <tr>
                    <td class="col-1 gray-cell">
                        <p>Marketing Scale <br> and Growth</p>
                    </td>
                    <td>A3</td>
                    <td>B3</td>
                    <td>C3</td>
                    <td class="Drow">D3</td>
                </tr>
                <!-- Table Row 5 -->
                <tr>
                    <td class="col-1 gray-cell">
                        <p>Data-Driven<br>  Decision Making</p>
                    </td>
                    <td>A4</td>
                    <td class="Brow">B4</td>
                    <td>C4</td>
                    <td>D4</td>
                </tr>
            </table>
        </div>
        <!-- End Table -->

        <div class="logo-row">
            <img src="https://www.measured.com/wp-content/uploads/2021/04/measured-logotext.svg">
        </div>
    </div> <!-- End Container -->
        <div class="gradient-bottom"></div>
    </body>
    </html>
`
  );

  // print page as pdf
  const pdf = await newPage.pdf({
    path: "./my-pdf.pdf",
    format: "A4",
    printBackground: true,
    margin: {
      top: "1cm",
      right: "1cm",
      bottom: "1cm",
      left: "1cm",
    },
  });

  // await page.pdf({
  //   path: "hn.pdf",
  //   // format: "a4",
  //   preferCSSPageSize: true,
  //   printBackground: true,
  // });

  await browser.close();
})();
