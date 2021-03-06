"use strict";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            validName: false,
        };
        fetch("/getItems")
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    items: res,
                });
            });
    }

    render() {
        return (
            <div>
                <form
                    action="javascript:void(0)"
                    onSubmit={(e) => {
                        if (e.target[0].value === "") return;
                        fetch("/addItem", {
                            body: JSON.stringify({
                                name: e.target[0].value,
                                done: false,
                            }),
                            headers: { "Content-Type": "application/json" },
                            method: "POST",
                        }).then((res) => {
                            fetch("/getItems")
                                .then((res) => res.json())
                                .then((res) => {
                                    e.target[0].value = "";
                                    this.setState({
                                        items: res,
                                        validName: false,
                                    });
                                });
                        });
                    }}
                >
                    <div className="row offset-by-three column">
                        <div className="six columns">
                            <input
                                type="text"
                                placeholder="Type something..."
                                className="u-pull-left two-thirds column"
                                id="todo-item-name-field"
                                onChange={(e) => {
                                    if (e.target.value === "")
                                        this.setState({ validName: false });
                                    else this.setState({ validName: true });
                                }}
                                title="Name of the item to add to the todo list"
                            />
                            <input
                                className={`${
                                    !this.state.validName
                                        ? ""
                                        : "button-primary"
                                } u-pull-right one-third column`}
                                type="submit"
                                value="Add Item"
                                disabled={!this.state.validName}
                                title={
                                    this.state.validName
                                        ? `Add "${
                                              document.getElementById(
                                                  "todo-item-name-field"
                                              ).value
                                          }" to the todo list`
                                        : "Please enter a name for the item"
                                }
                            />
                            <div hidden={this.state.items.length !== 0}>
                                <p
                                    style={{
                                        fontSize: "1.75em",
                                        textAlign: "center",
                                        color: "#666",
                                        fontFamily:
                                            "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                                    }}
                                >
                                    No items yet. Try adding one!
                                </p>
                            </div>
                            <div hidden={this.state.items.length === 0}>
                                {this.state.items
                                    .filter((x) => !x.done)
                                    .concat(
                                        this.state.items.filter((x) => x.done)
                                    )
                                    .map((item) => (
                                        <div className="box u-full-width">
                                            <span
                                                className="u-full-width"
                                                style={{
                                                    textDecoration: item.done
                                                        ? "line-through"
                                                        : "initial",
                                                    height: "100%",
                                                    fontFamily:
                                                        "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                                                }}
                                            >
                                                <span className="check-box">
                                                    <input
                                                        type="checkbox"
                                                        value="done"
                                                        title="Mark this item as done"
                                                        checked={item.done}
                                                        onChange={(e) => {
                                                            fetch(
                                                                "/updateItem",
                                                                {
                                                                    body: JSON.stringify(
                                                                        {
                                                                            id:
                                                                                item.id,
                                                                            done:
                                                                                e
                                                                                    .target
                                                                                    .checked,
                                                                        }
                                                                    ),
                                                                    headers: {
                                                                        "Content-Type":
                                                                            "application/json",
                                                                    },
                                                                    method:
                                                                        "PUT",
                                                                }
                                                            ).then((res) => {
                                                                fetch(
                                                                    "/getItems"
                                                                )
                                                                    .then(
                                                                        (res) =>
                                                                            res.json()
                                                                    )
                                                                    .then(
                                                                        (res) =>
                                                                            this.setState(
                                                                                {
                                                                                    items: res,
                                                                                }
                                                                            )
                                                                    );
                                                            });
                                                        }}
                                                    />
                                                </span>
                                                <span
                                                    style={{ marginLeft: "5%" }}
                                                >
                                                    {item.name}
                                                </span>
                                                <a
                                                    title="Delete this item"
                                                    href="javascript:void(0)"
                                                    className="u-pull-right"
                                                    style={{
                                                        marginRight: "3%",
                                                    }}
                                                    onClick={() => {
                                                        fetch("/deleteItem", {
                                                            body: JSON.stringify(
                                                                {
                                                                    id: item.id,
                                                                }
                                                            ),
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/json",
                                                            },
                                                            method: "DELETE",
                                                        }).then((res) => {
                                                            fetch("/getItems")
                                                                .then((res) =>
                                                                    res.json()
                                                                )
                                                                .then((res) =>
                                                                    this.setState(
                                                                        {
                                                                            items: res,
                                                                        }
                                                                    )
                                                                );
                                                        });
                                                    }}
                                                >
                                                    <img
                                                        height="20px"
                                                        src="/images/delete.png"
                                                    />
                                                </a>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
