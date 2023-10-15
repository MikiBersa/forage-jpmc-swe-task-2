/*
THIS FILE IS THE MAIN FILE OF THE WEB APPLICATION
THE FIRST THAT IS RENDERED AND THE SHELETON OF THE SERVER
*/
//React, which is just a JavaScript library
//to help us build interfaces and ui components
import React,
{ Component
} from 'react';
import DataStreamer,
{ ServerRespond
} from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}
/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 *
 * App.tsx or the App component, is basically the first component
 * our browser will render as it’s the parent component of the other parts of
 * the simple page that shows up when you first start the application in the set up phase.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      // we must define all the state in the interface IState so in the obect state we have all the state variable
      showGraph: false
    };
  }
  /**
   * Render Graph react component with state.data parse as property data
   * every moment that data will be updated also the proprety of Graph will be updated
   * also the new price will be drawed
   */
  renderGraph() {
    if(this.state.showGraph){
      return (<Graph data={this.state.data }/>)
    }
  }
  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    // each time we receive new data I will update the state of Data that is connected
    // to the property of Graph
    let max_interval = 0;
    const inteval = setInterval(
      () => {
        DataStreamer.getData((serverResponds: ServerRespond[]) => {
          // Update the state by creating a new array of data that consists of
          // Previous data in the state and the new data from server
          /*
          this.setState({ data: [...this.state.data, ...serverResponds
            ]
          });*/
          this.setState({
              data: serverResponds,
              showGraph: true
          });
        });

        max_interval++;
        if (max_interval>1000){
          // i will stop the calling to server if i have called for 1000 times
          clearInterval(inteval);
        }
      }
     );
  }
  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
    // when button is click, our react app tries to request
    // new data from the server.
    // As part of your task, update the getDataFromServer() function
    // to keep requesting the data every 100ms until the app is closed
    // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()
      }
    }>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()
    }
          </div>
        </div>
      </div>
    )
  }
}

export default App;
