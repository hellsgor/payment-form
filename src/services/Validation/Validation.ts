import { IControl } from '../../components/Control/Control.types';
import { ValidationProps } from './Validation.types';

export class Validation {
  controls: IControl[] = [];
  eventTypes: Set<keyof HTMLElementEventMap>;

  constructor(props: ValidationProps) {
    this.eventTypes = new Set();
    this.eventTypes.add('change');
    this.eventTypes.add(props.validationEventType || 'input');
  }

  initControlValidation(control: IControl): void {
    this.eventTypes.forEach((eventType) => {
      control.$controlElem
        .querySelector('input')
        ?.addEventListener(eventType, this.validate);
    });

    this.controls.push(control);
  }

  validate(): void {}
}
