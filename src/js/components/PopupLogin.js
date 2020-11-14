import Popup from './Popup';

export default class PopupLogin extends Popup {
  constructor(props) {
    super(props);
    this.popup = props.popup;
  }
}