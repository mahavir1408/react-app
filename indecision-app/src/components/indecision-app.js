import React from 'react';
import AddOption from './add-option';
import Header from './header';
import Action from './action';
import Options from './options';

class IndecisionApp extends React.Component {
  constructor(props) {
      super(props);
      this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.handleDeleteOption = this.handleDeleteOption.bind(this);
      this.state = {
          options: []
      }
  }

  componentDidMount() {
      try {
          const json = sessionStorage.getItem('options');
          const options = JSON.parse(json);
          if (options) {
              this.setState(() => ({ options }));
          }
      } catch (e) {
          console.log(e);
      }
  }

  componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
          const json = JSON.stringify(this.state.options);
          sessionStorage.setItem('options', json);
      }
  }

  componentWillUnmount() {
      console.log('componentWillUnmount');
  }

  handleDeleteOptions() {
      this.setState(() => ({ options: [] }));
  }

  handleDeleteOption(optionToRemove) {
      this.setState((prevState) => ({
          options: prevState.options.filter((option) => optionToRemove !== option)
      }));
  }

  handlePick() {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      alert(option);
  }

  handleAddOption(option) {
      if (!option) {
          return 'Enter valid value to add item';
      } else if (this.state.options.indexOf(option) > -1) {
          return 'This option already exists';
      }
      this.setState((prevState) => ({ options: prevState.options.concat(option)}));
  }

  render() {
      const subtitle = 'Put your life in the hands of computer';
      return (
          <div>
              <Header subtitle={subtitle} />
              <Action 
                  hasOptions={this.state.options.length > 0}
                  handlePick={this.handlePick}
              />
              <Options
                  options={this.state.options}
                  handleDeleteOptions={this.handleDeleteOptions}
                  handleDeleteOption={this.handleDeleteOption}
                  handleAddOption={this.handleDeleteOption}
              />
              <AddOption
                  handleAddOption={this.handleAddOption}
              />  
          </div>
      );
  }
}

IndecisionApp.defaultProps = {
  options: []
}

export default IndecisionApp;
