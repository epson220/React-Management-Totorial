import React, { Component } from 'react';
import './App.css';
import Customer from "./components/Customer";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomerAdd from './components/CustomerAdd';

const styles = theme => ({
  root : {
    width: '100%',
    marginTop : theme.spacing.unit*3,
    overflowX: "auto"
  },
  table : {
    minWidth:1080
  },
  progess: {
    margin: theme.spacing.unit*2
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });
    this.callApi().then(res=>this.setState({customers:res})).catch(err=> console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progess, 20); //0.02초마다 progress함수 실행되게 설정
    this.callApi().then(res=>this.setState({customers:res})).catch(err=> console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed+1});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.customers ? this.state.customers.map(c => {
            return (<Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}></Customer>);
          }) : <TableRow> 
              <TableCell colSpan="6" align="center">
                <CircularProgress className={classes.progess} variant="determinate" value={this.state.completed}></CircularProgress>
              </TableCell>
            </TableRow>}
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={this.stateRefresh}></CustomerAdd>
      </div>
    );
  }
}
export default withStyles(styles)(App);
