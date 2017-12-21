const fs = require('fs');
const path = require('path');
const promisify = require('es6-promisify');

const docgenDir = path.resolve(__dirname, '..', 'docgen');

const getPropFiles = () =>
  promisify(fs.readdir)(docgenDir)
    .then(files => Promise.resolve(files))
    .catch(err => Promise.reject(err));

const parsePropsFile = fileName =>
  promisify(fs.readFile)(path.join(docgenDir, fileName))
    .then(data => Promise.resolve(JSON.parse(data)))
    .catch(err => Promise.reject(err));

const buildPropRows = (json = {}) => {
  const { props = {} } = json;

  return Object.keys(props).map(propName => {
    let html = `<tr><td>${propName}</td>`;
    const prop = props[propName];

    if (prop.type) {
      html += `<td>${prop.type.name}`;
      if (prop.type.value) {
        html += `(${prop.type.value.name})</td>`;
      } else {
        html += '</td>';
      }
    } else {
      html += '<td></td>';
    }

    if (prop.defaultValue) {
      html += `<td>${prop.defaultValue.value}</td>`;
    } else {
      html += '<td></td>';
    }

    if (prop.required) {
      html += `<td>${prop.required}</td>`;
    } else {
      html += `<td>${false}</td>`;
    }

    if (prop.description) {
      html += `<td>${prop.description}</td>`;
    } else {
      html += '<td></td>';
    }

    return `${html}</tr>`;
  });
};

const castJsonToTable = json => `<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 125px;">Name</th>
      <th style="width: 75px;">Type</th>
      <th>Default</th>
      <th style="width: 75px;">Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    ${buildPropRows(json).reduce((str, row) => str + row, '')}
  </tbody>
</table>`;

const buildPropsTableHtml = fileName =>
  parsePropsFile(fileName)
    .then(castJsonToTable)
    .catch(err => Promise.reject(err));

const run = () =>
  getPropFiles()
    .then(files =>
      Promise.all(
        files.map(fileName =>
          buildPropsTableHtml(fileName).then(tableHtml =>
            promisify(fs.writeFile)(path.resolve(__dirname, '..', `${fileName.split('.')[0]}.props.html`), tableHtml)
          )
        )
      )
    )
    .catch(err => Promise.reject(err));

run().catch(err => {
  console.log(err);
  process.exit(-1);
});
