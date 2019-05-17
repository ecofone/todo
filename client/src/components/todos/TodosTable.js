import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import DelayedIcon from '@material-ui/icons/AccessTime';
import OpenIcon from '@material-ui/icons/Work';

import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'; 


let counter = 0;

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'dueDate', numeric: false, disablePadding: false, label: 'Due Date' },
  { id: 'createdBy', numeric: false, disablePadding: false, label: 'Created By' },
  { id: 'assignedTo', numeric: false, disablePadding: false, label: 'Assigned To' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'priority', numeric: false, disablePadding: false, label: 'Priority' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
         <TableCell padding='checkbox'>
              {' '}
          </TableCell>
          <TableCell padding='checkbox'>
              {' '}
          </TableCell>
          <TableCell padding='checkbox'>
              {' '}
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            My TODOs!
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableCell: {
    padding: theme.spacing.unit * 0.03,
  },
});

class TodosTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'desc',
            orderBy: 'dueDate',
            selected: [],
            page: 0,
            rowsPerPage: 5,
          };
        this.data = [];
    }
    
  componentDidMount() {
    this.props.fetchTodos();
}

  renderStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <OpenIcon />
      case 'delayed':
        return <DelayedIcon />
      case 'closed':
        return <DoneIcon />
    }

  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleClickOnEdit = (event, todo) => {
    this.props.editTodo(todo, this.props.history);
  };

  handleClickOnDelete = (event, id) => {
    this.props.submitDeleteTodo(id, this.props.history);
  };

  handleClickOnDone = (event, todo) => {
    if (todo.status !== 'closed') {
      this.props.submitEditTodo({...todo, status: 'closed'}, this.props.history);
    }
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const data = this.props.todos;
    const { order, orderBy, selected, rowsPerPage, page} = this.state;

    if (!data) {
        return(null);
    };

    if (data.length == 0) {
      return(<Typography align="center" variant="h5" gutterBottom>Start Creating Todos!</Typography>);
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    console.log("Render DataTable:", data);
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n._id);
                  const dueDate = new Date(n.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit'});
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={n._id}
                    >
                      
                      <TableCell padding='dense' className={classes.tableCell} onClick={(e) => this.handleClickOnDone(e, n)} >
                       {n.status !== 'closed' &&
                        <IconButton aria-label="Edit">
                            <DoneIcon />
                        </IconButton>
                       }
                      </TableCell>
                      <TableCell padding='dense' className={classes.tableCell} onClick={(e) => this.handleClickOnEdit(e, {...n, dueDate: n.dueDate.substring(0, 10)})} >
                        <IconButton aria-label="Edit">
                            <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell padding='dense' className={classes.tableCell} onClick={(e) => this.handleClickOnDelete(e, n._id)}>
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell align="right">{n.description}</TableCell>
                      <TableCell align="right">{dueDate}</TableCell>
                      <TableCell align="right">{n.createdBy.lastName}</TableCell>
                      <TableCell align="right">{n.assignedTo.lastName}</TableCell>
                      <TableCell align="right">{this.renderStatusIcon(n.status)}</TableCell>
                      <TableCell align="right">{n.priority}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

TodosTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({todos}) => ({todos});


export default connect (mapStateToProps, actions) (withStyles(styles)((withRouter(TodosTable))));






