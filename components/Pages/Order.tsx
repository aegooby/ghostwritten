
import * as React from "react";

type EssayType = "ia" | "ee" | "ca";

interface State
{
    essayType: EssayType;
}

export default class Order extends React.Component<unknown, State>
{
    constructor(props: unknown)
    {
        super(props);
    }
    render(): React.ReactElement
    {
        const element =
            <div className="wrapper">
                <div className="header">
                    <div className="title-wrapper">
                        <h2>
                            <strong><span className="ghost-gray">Select</span> your essay</strong>
                        </h2>
                    </div>
                </div>
                <div className="page">
                    <div className="form-wrapper">
                        <form onSubmit={() => { }}>
                            <h3><strong>Essay type</strong></h3>
                            <div className="options">
                                <input type="radio" id="radio-ia" name="essay-type" />
                                <label htmlFor="radio-ia">Internal<br /> Assessment</label>
                                <input type="radio" id="radio-ee" name="essay-type" />
                                <label htmlFor="radio-ee">Extended<br /> Essay</label>
                                <input type="radio" id="radio-ca" name="essay-type" />
                                <label htmlFor="radio-ca">College<br /> Application</label>
                            </div>
                        </form>
                    </div>
                    <p className="copyinfo">© 2021 Ghostwritten</p>
                </div>
            </div >;

        return element;
    }
}
