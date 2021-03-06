import * as React from "react";
// import { push } from "../../history";
import { browserHistory } from 'react-router';

export class MapPoint extends React.Component<any, any> {
  select() {
    let p1 = this.props.location.query.p1 || "PlantInfo";
    let url = `/app/dashboard/designer?p1=${ p1 }&id=${ this.props.plant._id }`;
    browserHistory.push(url);
  }

  selected() {
    let isSelected = (!!this.props.selected);
    return isSelected;
  }

  render() {
    let length = this.props.designer.y_size;
    let fill = this.selected() ? "red" : "black";
    return <circle cx={ this.props.plant.x }
                   cy={ (-1 * this.props.plant.y) + length }
                   onClick={ this.select.bind(this) }
                   fill={ fill }
                   r="5" />;
  }
};

export class GardenMap extends React.Component<any, any> {
  plants() {
    return this
      .props
      .designer
      .plants
      .map((p, k) => {
        let isSelected = this.props.location.query.id === p._id;
        return <MapPoint plant={ p }
                         key={ k }
                         { ...this.props }
                         selected={ isSelected } />;
      });
  }

  render() {
    let style = {
      fill:        "rgba(0,0,0,0.05)",
      strokeWidth: 5,
      stroke:      "rgba(0,0,0,0.15)"
    };

    let width = this.props.designer.x_size;
    let length = this.props.designer.y_size;

    return <div>
             <div className="drop-area"
                  id="drop-area"
                  style={ {marginLeft: "10px", marginTop: "10px"} }>
              <svg width={ width }
                   height={ length } >
                <rect width={ width }
                      height={ length }
                      style={ style } />
                { this.plants() }
              </svg>
             </div>
           </div>;
  }
}
