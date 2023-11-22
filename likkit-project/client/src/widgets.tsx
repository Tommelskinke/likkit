import * as React from 'react';
import { ReactNode, ChangeEvent } from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

export const checkmark = (
  <img
    style={{
      cursor: 'pointer',
    }}
    src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg"
    alt="Picture of checkmark used for marking the best answer"
  />
);
export const bubble = (
  <img
    src="https://cdn-icons-png.flaticon.com/512/9513/9513587.png"
    alt="Picture of comment bouble"
  />
);
export const logo = (
  <img
    src="https://cdn.discordapp.com/attachments/623523695540830219/1169948601183649832/380254333_641845358065071_8017670276526516197_n.png?ex=6557428b&is=6544cd8b&hm=45e12c97e4c20ea17fc19d8feb50b18def1fa2ad524236098cb95bba40b4a144&"
    alt="Picture of likkit logo"
  />
);
export const deleteButton = (
  <img
    src="https://icon-library.com/images/trashcan-icon/trashcan-icon-14.jpg"
    alt="Hvit søppelkasse med rød bakgrunn"
  />
);
//png.pngtree.com/png-vector/20220816/ourmid/pngtree-long-shadow-flat-design-container-button-with-trash-can-icon-vector-png-image_19524360.png

export const filledStar = (
  <img
    style={{ cursor: 'pointer' }}
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1024px-Gold_Star.svg.png"
    alt="Filled picture of star, indicates favorite"
  />
);

export const emptyStar = (
  <img
    style={{ cursor: 'pointer' }}
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/800px-Five-pointed_star.svg.png"
    alt="Empty picture of star, indicates not favorites"
  />
);

export const upLikk = (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Eo_circle_blue_arrow-up.svg/2048px-Eo_circle_blue_arrow-up.svg.png"
    alt="Oppoverpil"
  />
);

export const downLikk = (
  <img
    src="https://cdn.discordapp.com/attachments/1009402721864003636/1174087028477009921/oransje_ned.png?ex=656650c1&is=6553dbc1&hm=1f43c6a51f2a422996eafe2ec038f6700e79bc762c4a5e9041e2460cca9c5429&"
    alt="nedoverpil"
  />
);

export const SoMeX = (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png"
    alt="X-logo (twitter)"
  />
);

export const SoMeInsta = (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Instagram.svg/2048px-Instagram.svg.png"
    alt="Instagramlogo"
  />
);

export const SoMeReddit = (
  <img src="https://www.redditinc.com/assets/images/site/reddit-logo.png" alt="Redditlogo" />
);

export function SoMeRedditLink() {
  let target = 'https://www.reddit.com/submit';
  window.open(target, '_blank');
}

export function SoMeInstaLink() {
  let target = 'https://www.instagram.com';
  window.open(target, '_blank');
}

export function SoMeXLink() {
  let target = 'https://www.x.com';
  window.open(target, '_blank');
}

/**
 * Renders an information card using Bootstrap classes.
 *
 * Properties: title, marginTop, marginBottom
 */
export class Card extends Component<{
  title: ReactNode;
  marginTop?: number;
  marginBottom?: number;
  width?: string; // Add a width prop
  backgroundColor?: string;
  backgroundImage?: string;
}> {
  render() {
    const cardStyle = {
      width: this.props.width || 'auto', // Use the provided width or 'auto' as the default
      backgroundColor: this.props.backgroundColor,
    };

    const cardTitleStyle = {
      fontWeight: 'bold', // Make the text bold
      color: 'white', // Change the text color to blue
    };

    return (
      <div className={'mt' + (this.props.marginTop ? '-' + this.props.marginTop : '')}>
        <div className={'mb' + (this.props.marginBottom ? '-' + this.props.marginBottom : '')}>
          <div className="card" style={cardStyle}>
            {' '}
            {/* Apply the width style here */}
            <div className="card-body">
              <h5 className="card-title" style={cardTitleStyle}>
                {this.props.title}
              </h5>
              <div className="card-text">{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Renders a row using Bootstrap classes.
 *
 * Properties: marginTop, marginBottom
 */
export class Row extends Component<{
  marginTop?: number;
  marginBottom?: number;
}> {
  render() {
    return (
      <div className={'mt' + (this.props.marginTop ? '-' + this.props.marginTop : '')}>
        <div className={'mb' + (this.props.marginBottom ? '-' + this.props.marginBottom : '')}>
          <div className="row">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

/**
 * Renders a column with specified width using Bootstrap classes.
 *
 * Properties: width, right/none
 */
export class Column extends Component<{
  width?: number;
  none?: boolean;
  right?: boolean;
}> {
  render() {
    return (
      <div className={'col' + (this.props.width ? '-' + this.props.width : '')}>
        <div className={'float-' + (this.props.none ? 'none' : this.props.right ? 'end' : 'start')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

class ButtonPost extends Component<{ small?: boolean; onClick: () => void }> {
  render() {
    return (
      <button
        type="button"
        className="btn custom-gray"
        style={{
          width: '100%',
        }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

class ButtonVote extends Component<{ small?: boolean; onClick: () => void }> {
  render() {
    return (
      <button
        type="button"
        className="btn custom-gray"
        style={{
          width: '5%',
        }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

class ButtonShare extends Component<{ small?: boolean; onClick: () => void }> {
  render() {
    return (
      <button
        type="button"
        className="btn custom-gray"
        style={{
          width: '10%',
          color: 'white',
        }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
/**
 * Renders a success button using Bootstrap styles.
 *
 * Properties: small, onClick
 */
class ButtonSuccess extends Component<{ small?: boolean; onClick: () => void }> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-success"
        style={
          this.props.small
            ? {
                padding: '5px 5px',
                fontSize: '16px',
                lineHeight: '0.7',
              }
            : {}
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

class ButtonBlue extends Component<{ small?: boolean; onClick: () => void }> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-success"
        style={
          this.props.small
            ? {
                padding: '5px 5px',
                fontSize: '16px',
                lineHeight: '0.7',
                backgroundColor: 'rgb(110, 160, 195)',
                border: 'none',
                fontWeight: 'bold',
              }
            : { backgroundColor: 'rgb(110, 160, 195)', border: 'none', fontWeight: 'bold' }
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a danger button using Bootstrap styles.
 *
 * Properties: small, onClick
 */
class ButtonDanger extends Component<{ small?: boolean; onClick: () => void }> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-danger"
        style={
          this.props.small
            ? {
                padding: '5px 5px',
                fontSize: '16px',
                lineHeight: '0.7',
              }
            : {}
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a light button using Bootstrap styles.
 *
 * Properties: small, onClick
 */
class ButtonLight extends Component<{
  small?: boolean;
  onClick: () => void;
}> {
  render() {
    return (
      <button
        type="button"
        className="btn btn-light"
        style={
          this.props.small
            ? {
                padding: '5px 5px',
                fontSize: '16px',
                lineHeight: '0.7',
              }
            : {}
        }
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a button using Bootstrap styles.
 *
 * Properties: onClick
 */
export class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
  static Post = ButtonPost;
  static Vote = ButtonVote;
  static Share = ButtonShare;
  static Blue = ButtonBlue;
}

/**
 * Renders a NavBar link using Bootstrap styles.
 *
 * Properties: to
 */
class NavBarLink extends Component<{ to: string }> {
  render() {
    return (
      <NavLink className="nav-link" activeClassName="active" to={this.props.to}>
        {this.props.children}
      </NavLink>
    );
  }
}

/**
 * Renders a NavBar using Bootstrap classes.
 *
 * Properties: brand
 */
export class NavBar extends Component<{ brand: ReactNode; id: string }> {
  static Link = NavBarLink;

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid justify-content-start">
          <NavLink className="navbar-brand" activeClassName="active" exact to="/">
            {this.props.brand}
          </NavLink>
          <div className="navbar-nav" id={this.props.id}>
            {this.props.children}
          </div>
        </div>
      </nav>
    );
  }
}

/**
 * Renders a form label using Bootstrap styles.
 */
class FormLabel extends Component {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

/**
 * Renders a form input using Bootstrap styles.
 */
class FormInput extends Component<{
  type: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { type, value, onChange, ...rest } = this.props;
    return (
      <input
        {...rest}
        className="form-control"
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

/**
 * Renders a form textarea using Bootstrap styles.
 */
class FormTextarea extends React.Component<{
  value: string | number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, rows, cols
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, ...rest } = this.props;
    return <textarea {...rest} className="form-control" value={value} onChange={onChange} />;
  }
}

/**
 * Renders a form checkbox using Bootstrap styles.
 */
class FormCheckbox extends Component<{
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, width, height, pattern
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { checked, onChange, ...rest } = this.props;
    return (
      <input
        {...rest}
        className="form-check-input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    );
  }
}

/**
 * Renders a form select using Bootstrap styles.
 */
class FormSelect extends Component<{
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  [prop: string]: any;
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, size.
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, children, ...rest } = this.props;
    return (
      <select {...rest} className="custom-select" value={value} onChange={onChange}>
        {children}
      </select>
    );
  }
}

/**
 * Renders form components using Bootstrap styles.
 */
export class Form {
  static Label = FormLabel;
  static Input = FormInput;
  static Textarea = FormTextarea;
  static Checkbox = FormCheckbox;
  static Select = FormSelect;
}

/**
 * Renders alert messages using Bootstrap classes.
 *
 * Students: this slightly more complex component is not part of curriculum.
 */
export class Alert extends Component {
  alerts: { id: number; text: ReactNode; type: string }[] = [];
  nextId: number = 0;

  render() {
    return (
      <div>
        {this.alerts.map((alert, i) => (
          <div
            key={alert.id}
            className={'alert alert-dismissible alert-' + alert.type}
            role="alert"
          >
            {alert.text}
            <button
              type="button"
              className="btn-close btn-sm"
              onClick={() => this.alerts.splice(i, 1)}
            />
          </div>
        ))}
      </div>
    );
  }

  /**
   * Show success alert.
   */
  static success(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'success' });
    });
  }

  /**
   * Show info alert.
   */
  static info(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'info' });
    });
  }

  /**
   * Show warning alert.
   */
  static warning(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'warning' });
    });
  }

  /**
   * Show danger alert.
   */
  static danger(text: ReactNode) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      let instance = Alert.instance(); // Get rendered Alert component instance
      if (instance) instance.alerts.push({ id: instance.nextId++, text: text, type: 'danger' });
    });
  }
}
