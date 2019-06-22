import React, { Component, PropTypes } from "react";
import { View, Dimensions } from "react-native";
import Header from "../components/Header";
import DefaultPicker from "../components/DefaultPicker";
import RoundButton from "../components/RoundButton";
import Icon from "../services/IconService";
import { connect } from "react-redux";
import {
    populateModels,
    populateYears,
    populateMakes,
    populateProducts
} from "../actions/thunk";

let width = Dimensions.get("window").width - 30;

class Filter extends Component {
    state = {
        status: "idle",
        make: "",
        model: "",
        year: ""
    };

    search = () => {
        this.setState({ status: "rotate" });
        let { make, year, model } = this.state;
        this.props.dispatch(
            populateProducts(make, model, year, () => {
                this.setState({ status: "success" });
                setTimeout(() => {
                    this.props.navigation.navigate("Categories", {
                        parent: make
                    });
                    setTimeout(() => this.setState({ status: "idle" }), 100);
                }, 100);
            })
        );
    };

    componentWillMount() {
        this.props.dispatch(populateMakes());
    }

    render() {
        let { make, year, model } = this.state;
        let { makes, years, models } = this.props;
        return (
            <React.Fragment>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <DefaultPicker
                        placeholder="Select a Make"
                        selectedValue={make}
                        data={makes}
                        description="Car manufacturer"
                        onValueChange={(e, i) => {
                            this.setState({
                                ...this.state,
                                make: e
                            });
                            this.props.dispatch(populateModels(e));
                        }}
                        leftIcon={() => (
                            <Icon
                                name="selectmake"
                                size={30}
                                color={make === "" ? "black" : "green"}
                            />
                        )}
                        rightIcon={() => (
                            <Icon
                                name="chevron"
                                color="#c4c4c4"
                                size={20}
                                color={make === "" ? "black" : "green"}
                            />
                        )}
                    />
                    <View
                        style={{ backgroundColor: "#c4c4c4", height: 2, width }}
                    />
                    <DefaultPicker
                        data={models}
                        placeholder="Select a Model"
                        description="Car model"
                        onValueChange={(e, i) => {
                            this.setState({
                                ...this.state,
                                model: e
                            });
                            this.props.dispatch(populateYears(make, e));
                        }}
                        selectedValue={model}
                        leftIcon={() => (
                            <Icon
                                name="selectmodel"
                                size={24}
                                color={model === "" ? "black" : "green"}
                            />
                        )}
                        rightIcon={() => (
                            <Icon
                                name="chevron"
                                color="#c4c4c4"
                                size={20}
                                color={model === "" ? "black" : "green"}
                            />
                        )}
                    />
                    <View
                        style={{ backgroundColor: "#c4c4c4", height: 2, width }}
                    />

                    <DefaultPicker
                        data={years}
                        placeholder="Select a Generation"
                        onValueChange={(e, i) => {
                            this.setState({
                                ...this.state,
                                year: e
                            });
                        }}
                        description="Year"
                        selectedValue={year}
                        leftIcon={() => (
                            <Icon
                                name="calendar"
                                size={28}
                                color={year === "" ? "black" : "green"}
                            />
                        )}
                        rightIcon={() => (
                            <Icon
                                name="chevron"
                                size={20}
                                color="#c4c4c4"
                                color={year === "" ? "black" : "green"}
                            />
                        )}
                    />
                    <RoundButton
                        status={this.state.status}
                        fill
                        color="#03a127"
                        onPress={this.search}
                        text="Search"
                        animated
                        big
                    />
                </View>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ makes = [], models = [], years = [] }) => {
    return {
        makes,
        models,
        years
    };
};

export default connect(mapStateToProps)(Filter);
