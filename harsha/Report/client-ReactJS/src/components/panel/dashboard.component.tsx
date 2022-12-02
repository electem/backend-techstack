import { Component } from "react";
import PanelService from "../../services/panel.service";
import { Panel } from "../../types/panel.type";
import { Chart, registerables } from "chart.js";

type Props = {};
type State = {
    panels: Array<Panel>;
  };

export default class Dashboard extends Component<Props, State> {
  panelList: Panel[]=[];
  panelNames:string[]=[];
  testsCount:number[]=[];
  
  constructor(props: Props) {
    super(props);

    this.retrievePanels = this.retrievePanels.bind(this);

    this.state = {
      panels: [],
    };
  }

  componentDidMount() {
    this.retrievePanels();
  }

  retrievePanels() {
    PanelService.getPanels()
      .then((response) => {
        this.setState({
          panels: response.data,
        });
        this.panelList = response.data
        this.panelNames = this.panelList.map((name) => {
          return name.name!;
        });
        this.testsCount = this.panelList.map((count) => {
          return count.tests?.length!;
        });
        this.panelsChart();
        this.getCharts();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  panelsChart() {
    Chart.register(...registerables);
    new Chart("chart1", {
      type: "line",
      data: {
        labels: this.panelNames,
        datasets: [
          {
            label: "# Number Of Tests",
            data: this.testsCount,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: "rgba(255, 99, 132, 1)",
            tension: 0.4,
            yAxisID: "testNumber",
          },
        ],
      },
      options: {
        scales: {
          testNumber: {
            beginAtZero: false,
            type: "linear",
            position: "left",
          },
        },
      },
    });
  }

   getCharts() {
    Chart.register(...registerables);
    new Chart("chart2", {
      type: "bar",
      data: {
        labels: this.panelNames,
        datasets: [
          {
            label: "# Number Of Tests",
            data: this.testsCount,
            backgroundColor: ["blue"],
            borderColor: "rgba(255, 99, 132, 1)",
            yAxisID: "testNumber",
          },
        ],
      },
      options: {
        scales: {
          testNumber: {
            beginAtZero: false,
            type: "linear",
            position: "left",
          },
        },
      },
    });
  }

  render() {

    return (
      <>
      <div className="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures">
      </div>
      <div className="header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="float-left">
                  <div className="hamburger sidebar-toggle">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                  </div>
                </div>
                <div className="head">
                  <a>Report Management System</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>Charts</h2>
      <div className="chart">
          <canvas id="chart1" ></canvas>
        </div>
        <div className="chart2">
          <canvas id="chart2" ></canvas>
        </div>
        </>
    );
  }
}
