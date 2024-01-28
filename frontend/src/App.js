
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import PageHeader from "./components/PageHeader";
import TableData from "./components/TableData";
import useStyles from "./App.Styles";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <PageHeader />
        <div style={{padding:'30px'}}>
          <TableData />
          </div>
      </div>
    </div>
  );
}

export default App;
