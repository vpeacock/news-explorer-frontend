import Popup from './Popup';

export default class PopupSignup extends Popup {
  constructor(props) {
    super(props);
    this.popup = props.popup;
  }
}