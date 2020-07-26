export default class NotificationAlertHelper {
  static dropDown;
  static onClose;
  static onTap;

  static setDropDown(dropDown) {
    this.dropDown = dropDown;
  }

  static show(type, title, message) {
    if (this.dropDown) {
      this.dropDown.alertWithType(type, title, message);
    }
  }

  static setOnTap(onTap) {
    this.onTap = onTap;
  }

  static invokeOnTap() {
    if (typeof this.onTap === 'function') {
      this.onTap();
      this.onTap = undefined;
    }
  }

  static setOnClose(onClose) {
    this.onClose = onClose;
  }

  static invokeOnClose() {
    if (typeof this.onClose === 'function') {
      this.onClose();
    }
  }
}
