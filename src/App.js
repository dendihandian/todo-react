import React, { Component } from "react";
import { todosRef } from "../src/api";
import "./App.css";
import "./component/style.css";
import InputText from "./component/InputText";
import List from "./component/List";
import Modal from "./component/Modal";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      todo: "",
      loading: true,
      id: "",
      filterText: "",
      status: false,
      error: false
    };
  }

  componentWillMount() {
    this.firebaseRef = todosRef;
  }

  componentDidMount() {
    this.firebaseRef
      .on("value", snapshot => {
        try {
          this.items = Object.entries(snapshot.val()).map(item => {
            return {
              id: item[0],
              name: item[1].name,
              status: item[1].status
            };
          });

          this.setState({ data: this.items, loading: false });
        } catch (error) {
          this.setState({ data: this.items, loading: false, error: true });
        }
      })
      .bind(this);
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  onChangeText = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updateToDo = async (id, name, checked) => {
    const update = {};
    update[id] = { name, status: checked };
    try {
      await this.firebaseRef.update(update);
    } catch (error) {
      console.log(error);
    }
  };    

  showEdit = (id, name, checked) => {
    this.setState({ modal: true, todo: name, id, status: checked });
  };

  showAdd = () => {
    this.setState({ modal: true, todo: "", id: "", status: false });
  };

  toggle = () => {
    if (!this.state.id) {
      this.setState({
        modal: false,
        todo: "",
        id: "",
        checked: "",
        status: ""
      });
    }
    this.setState({ modal: false });
  };

  deleteToDo = async id => {
    await this.firebaseRef.child(id).remove();
  };

  handleSubmit = async e => {
    if (e.charCode === 13) {
      try {
        if (!this.state.id) {
          this.firebaseRef.push({
            name: this.state.todo,
            status: this.state.status
          });
        } else {
          await this.updateToDo(
            this.state.id,
            this.state.todo,
            this.state.status
          );

          this.setState({ id: "" });
        }
        this.setState({ todo: "", modal: false, error: false });
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-sm-center align-items-sm-center">
          <div
            className="col-lg-5 col-md-5 col-sm-5 d-flex flex-column"
          >
            <div className="mt-2 search-input">
              <InputText
                name="filterText"
                value={this.state.filterText}
                onChangeText={this.onChangeText}
                onKeyPress={this.handleSubmit}
                placeholder="search"
              />
            </div>

            <div className="col mt-5">
              <div className="row justify-content-center bg-light">
                {this.state.error ? (
                  "Data Not Found"
                ) : (
                  <List
                    loading={this.state.loading}
                    data={this.state.data}
                    updateToDo={this.updateToDo}
                    filterText={this.state.filterText}
                    showEdit={this.showEdit}
                    deleteToDo={this.deleteToDo}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal open={this.state.modal} title="To Do" toggle={this.toggle}>
          <InputText
            name="todo"
            value={this.state.todo}
            onChangeText={this.onChangeText}
            onKeyPress={this.handleSubmit}
            placeholder="Add Todo"
          />
        </Modal>

        <i
          className="material-icons display-4 add-button"
          onClick={() => this.setState({ modal: true })}
        >
          add_circle
        </i>
      </div>
    );
  }
}

export default App;
