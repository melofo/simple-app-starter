var _react = _interopRequireDefault(require("react"));


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IssueRow(props) {
  const style = props.rowStyle;
  const issue = props.issue;
  return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    style: style
  }, issue.id), /*#__PURE__*/_react.default.createElement("td", {
    style: style
  }, issue.first_name), /*#__PURE__*/_react.default.createElement("td", {
    style: style
  }, issue.last_name), /*#__PURE__*/_react.default.createElement("td", {
    style: style
  }, issue.company), /*#__PURE__*/_react.default.createElement("td", {
    style: style
  }, issue.email), /*#__PURE__*/_react.default.createElement("td", {
    style: style
  }, issue.address1), /*#__PURE__*/_react.default.createElement("td", {
    style: style
  }, issue.address2), /*#__PURE__*/_react.default.createElement("td", {
    style: style
  }, issue.zip), /*#__PURE__*/_react.default.createElement("td", {
    style: style
  }, issue.city), /*#__PURE__*/_react.default.createElement("td", {
    style: style
  }, issue.state_long), /*#__PURE__*/_react.default.createElement("td", {
    style: style
  }, issue.state), /*#__PURE__*/_react.default.createElement("td", {
    style: style
  }, issue.phone));
}

function IssueTable(props) {
  const rowStyle = {
    border: "1px solid silver",
    padding: 4
  };
  const colHeaders = ['ID', 'First Name', 'Last Name', 'Company', 'Email', 'Address1', 'Address2', 'Zip', 'City', 'State Long', 'State', 'Phone'];
  const issueHeaders = colHeaders.map(header => /*#__PURE__*/_react.default.createElement("th", {
    key: header,
    style: rowStyle
  }, header));
  const issueRows = props.issues.map(issue => /*#__PURE__*/_react.default.createElement(IssueRow, {
    key: issue.id,
    rowStyle: rowStyle,
    issue: issue
  }));
  return /*#__PURE__*/_react.default.createElement("table", {
    style: {
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, issueHeaders)), /*#__PURE__*/_react.default.createElement("tbody", null, issueRows));
}

class IssueAdd extends _react.default.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return /*#__PURE__*/_react.default.createElement("form", {
      name: "issueAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "first_name:",
      placeholder: "First Name"
    }), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "last_name:",
      placeholder: "Last Name"
    }), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "company:",
      placeholder: "Company"
    }), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "email:",
      placeholder: "Email"
    }), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "adrress1:",
      placeholder: "Address1"
    }), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "adrress2:",
      placeholder: "Address2"
    }), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "zip:",
      placeholder: "Zip"
    }), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "city:",
      placeholder: "City"
    }), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "state_long:",
      placeholder: "State Long"
    }), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "state:",
      placeholder: "State"
    }), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "phone:",
      placeholder: "Phone"
    }), /*#__PURE__*/_react.default.createElement("button", null, "Add"));
  }
  /** Handle form submission to create issue */
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      // create issue from form values
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      company: form.company.value,
      email: form.email.value,
      address1: form.address1.value,
      address2: form.address2.value,
      zip: form.zip.value,
      city: form.city.value,
      state_long: form.state_long.value,
      state: form.state.value,
      phone: form.phone.value
    };
    this.props.createIssue(issue); // create issue
    form.first_name.value = ""; // clear form fields
    form.last_name.value = "";
    form.company.value = "";
    form.email.value = "";
    form.address1.value = "";
    form.address2.value = "";
    form.zip.value = "";
    form.city.value = "";
    form.state_long.value = "";
    form.state.value = "";
    form.phone.value = "";
  }
}

class IssueList extends _react.default.Component {
  constructor() {
    super(); // must call super constructor

    this.createIssue = this.createIssue.bind(this); // always bind to IssueList

    this.state = {
      issues: []
    };
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement(IssueTable, {
      issues: this.state.issues
    }), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement(IssueAdd, {
      createIssue: this.createIssue
    }));
  }
  /** load initial data */
  componentDidMount() {
    this.loadData();
  }
  /** replaces date strings by Data objects */
  fixupxIssuesArray(issues) {
    // convert dates in issues
    issues.forEach(issue => {
      // created date
      if (issue.created != null) {
        issue.created = new Date(issue.created);
      }

      if (issue.due != null) {
        // due date
        issue.due = new Date(issue.due);
      }
    });
  }
  /** asynchronously load data from source */
  async loadData() {
    const response = await fetch('components/non-duplicate.json');
    const data = await response.json();
    this.fixupxIssuesArray(data.issues);
    this.setState({
      issues: data.issues
    });
  }
  /** create new issue */
  createIssue(issue) {
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = this.state.issues.slice();
    newIssueList.push(issue);
    this.setState({
      issues: newIssueList
    });
  }
}


export default IssueList;
