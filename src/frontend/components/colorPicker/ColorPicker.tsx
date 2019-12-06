import * as React from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setStrokeColor } from '../../redux/actions/strokeColor';
import { RootAction, RootState } from '../../redux/reducers';
import { ToolChooser } from '../toolChooser/ToolChooser';
import './ColorPicker.scss';

export class UnconnectedColorPicker extends React.Component<
    ReturnType<typeof mapStateToProps> & {
        dispatch: Dispatch<RootAction>;
    },
    {}
> {
    onColorChange(colorResult: ColorResult) {
        const alpha =
            '00' + Math.round((colorResult.rgb.a || 1) * 255).toString(16);
        const color = colorResult.hex + alpha.substring(alpha.length - 2);
        this.props.dispatch(setStrokeColor(color));
    }

    render() {
        const color = this.props.strokeColor.substring(1);
        const rgba = {
            r: parseInt(color.substring(0, 2), 16),
            g: parseInt(color.substring(2, 4), 16),
            b: parseInt(color.substring(4, 6), 16),
            a: parseInt(color.substring(6, 8), 16) / 256,
        };

        return (
            <div className="app-color-picker">
                <Draggable
                    defaultPosition={{ x: 0, y: 0 }}
                    grid={[10, 10]}
                    bounds="parent"
                    position={undefined}
                    scale={1}
                    handle=".app-color-picker-handle"
                >
                    <div className="card">
                        <header className="app-color-picker-handle card-header">
                            <p className="card-header-title">Color</p>
                            <a
                                href="#"
                                className="card-header-icon"
                                aria-label="more options"
                            >
                                <span className="icon">
                                    <i
                                        className="fas fa-angle-down"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </a>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                <ToolChooser />
                                <hr />
                                <SketchPicker
                                    color={rgba}
                                    onChangeComplete={this.onColorChange.bind(
                                        this
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </Draggable>
            </div>
        );
    }
}

function mapStateToProps(state: RootState) {
    return {
        strokeColor: state.strokeColor,
    };
}

export const ColorPicker = connect(mapStateToProps)(UnconnectedColorPicker);