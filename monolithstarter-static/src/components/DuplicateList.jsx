import React from 'react';


function IssueRow(props) {
    const style = props.rowStyle;
    const issue = props.issue;
    return (
      <tr>
        <td style={style}>{issue.id}</td>
        <td style={style}>{issue.first_name}</td>
        <td style={style}>{issue.last_name}</td>
        <td style={style}>{issue.company}</td>
        <td style={style}>{issue.email}</td>
        <td style={style}>{issue.address1}</td>
        <td style={style}>{issue.address2}</td>
        <td style={style}>{issue.zip}</td>
        <td style={style}>{issue.city}</td>
        <td style={style}>{issue.state_long}</td>
        <td style={style}>{issue.state}</td>
        <td style={style}>{issue.phone}</td>
      </tr>
    );
}

function IssueTable(props) {
    const rowStyle = {border: "1px solid silver", padding: 4};
    const colHeaders = ['ID','First Name','Last Name','Company','Email','Address1','Address2','Zip','City','State Long','State','Phone'];
    const issueHeaders = colHeaders.map(header => <th key={header} style={rowStyle}>{header}</th>);
    const issueRows = props.issues.map(issue => <IssueRow key={issue.id} rowStyle={rowStyle} issue={issue}/>);
    return (
      <table style={{borderCollapse: "collapse"}}>
        <thead>
          <tr>
            {issueHeaders}
          </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </table>
    );
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="first_name:" placeholder="First Name" />
        <input type="text" name="last_name:" placeholder="Last Name" />
        <input type="text" name="company:" placeholder="Company" />
        <input type="text" name="email:" placeholder="Email" />
        <input type="text" name="adrress1:" placeholder="Address1" />
        <input type="text" name="adrress2:" placeholder="Address2" />
        <input type="text" name="zip:" placeholder="Zip" />
        <input type="text" name="city:" placeholder="City" />
        <input type="text" name="state_long:" placeholder="State Long" />
        <input type="text" name="state:" placeholder="State" />
        <input type="text" name="phone:" placeholder="Phone" />
        <button>Add</button>
      </form>
    );
  }
  /** Handle form submission to create issue */
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {  // create issue from form values
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
        phone: form.phone.value,
    };
    this.props.createIssue(issue);  // create issue
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

class IssueList extends React.Component {
  constructor() {
    super(); // must call super constructor
    this.createIssue = this.createIssue.bind(this); // always bind to IssueList
    this.state = {issues: [ ]};
  }
  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </React.Fragment>
    );
  }
  /** load initial data */
  componentDidMount() {
    this.loadData();
  }
  /** replaces date strings by Data objects */
  fixupxIssuesArray(issues) {
    // convert dates in issues
    issues.forEach(issue => { // created date
      if (issue.created != null) {
        issue.created = new Date(issue.created);
      }
      if (issue.due != null) { // due date
        issue.due = new Date(issue.due);
      }
    });
  }
  /** asynchronously load data from source */
  async loadData() {
    const response = await fetch('components/initialIssues.json');
    const data  = await response.json();
    this.fixupxIssuesArray(data.issues);
    this.setState({issues: data.issues});
  }
  /** create new issue */
  createIssue(issue) {
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = this.state.issues.slice();
    newIssueList.push(issue);
    this.setState({issues: newIssueList});
  }
}
