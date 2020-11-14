import Popup from './Popup';

export default class PopupSuccess extends Popup {
  constructor(props) {
    super(props);
    this.popup = props.popup;
  }
}