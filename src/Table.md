Example:

```jsx
const exampleProps = {
  columns: [
    {
      key: 'col1',
      title: 'Col One'
    },
    {
      key: 'col2',
      title: 'Col Two'
    },
    {
      key: 'col3',
      title: 'Col Three'
    },
    {
      key: 'col4',
      title: 'Col Four'
    }
  ],
  dataSource: [
    {
      key: 'one',
      col1: 'blah11',
      col2: 'blah12',
      col3: 'blah13',
      col4: 'blah14'
    },
    {
      key: 'two',
      col1: 'blah21',
      col2: 'blah22',
      col3: 'blah23',
      col4: 'blah24'
    }
  ]
};

<Table {...exampleProps} />;
```

Bordered Example:

```jsx
const exampleProps = {
  columns: [
    {
      key: 'col1',
      title: 'Col One'
    },
    {
      key: 'col2',
      title: 'Col Two'
    },
    {
      key: 'col3',
      title: 'Col Three'
    },
    {
      key: 'col4',
      title: 'Col Four'
    }
  ],
  dataSource: [
    {
      key: 'one',
      col1: 'blah11',
      col2: 'blah12',
      col3: 'blah13',
      col4: 'blah14'
    },
    {
      key: 'two',
      col1: 'blah21',
      col2: 'blah22',
      col3: 'blah23',
      col4: 'blah24'
    }
  ],
  isBordered: true
};

<Table {...exampleProps} />;
```

Expandable Example:

```jsx
const exampleProps = {
  columns: [
    {
      key: 'col1',
      title: 'Col One'
    },
    {
      key: 'col2',
      title: 'Col Two'
    },
    {
      key: 'col3',
      title: 'Col Three'
    },
    {
      key: 'col4',
      title: 'Col Four'
    }
  ],
  dataSource: [
    {
      key: 'one',
      col1: 'blah11',
      col2: 'blah12',
      col3: 'blah13',
      col4: 'blah14'
    },
    {
      key: 'two',
      col1: 'blah21',
      col2: 'blah22',
      col3: 'blah23',
      col4: 'blah24'
    }
  ],
  isBordered: true,
  onRowExpand: rowData => <h1>{rowData.key}</h1>
};

<Table {...exampleProps} />;
```

Clickable Example:

```jsx
const exampleProps = {
  columns: [
    {
      key: 'col1',
      title: 'Col One'
    },
    {
      key: 'col2',
      title: 'Col Two'
    },
    {
      key: 'col3',
      title: 'Col Three'
    },
    {
      key: 'col4',
      title: 'Col Four'
    }
  ],
  dataSource: [
    {
      key: 'one',
      col1: 'blah11',
      col2: 'blah12',
      col3: 'blah13',
      col4: 'blah14'
    },
    {
      key: 'two',
      col1: 'blah21',
      col2: 'blah22',
      col3: 'blah23',
      col4: 'blah24'
    }
  ],
  onRowClick: selectedRowData => setState({ selectedRowData })
};

<div>
  {state.selectedRowData && `selected row key: ${state.selectedRowData.key}`}
  <Table {...exampleProps} />
</div>;
```
