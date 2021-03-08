
import * as React from "react";

type EssayType = "unknown" | "ia" | "ee" | "ca";
type EssaySubject = "unknown" | "math-analysis" | "math-applications" | "physics" | "biology" | "english" | "spanish";

interface State
{
    essayType: EssayType;
    essaySubject: EssaySubject;
}

export default class Order extends React.Component<unknown, State>
{
    constructor(props: unknown)
    {
        super(props);

        this.state = { essayType: "unknown", essaySubject: "unknown" };

        this.onTypeChange = this.onTypeChange.bind(this);
        this.onSubjectChange = this.onSubjectChange.bind(this);
    }
    onTypeChange(type: EssayType): void
    {
        this.setState({ essayType: type });
    }
    onSubjectChange(subject: EssaySubject): void
    {
        this.setState({ essaySubject: subject });
    }
    render(): React.ReactElement
    {
        let subject: React.ReactElement = <></>;
        switch (this.state.essayType)
        {
            case "ia": case "ee":
                subject =
                    <div className="radio-wrapper">
                        <input type="radio" id="radio-math-analysis" name="essay-subject" onChange={() => this.onSubjectChange("math-analysis")} />
                        <label htmlFor="radio-math-analysis">Math<br /> Analysis</label>
                        <input type="radio" id="radio-math-applications" name="essay-subject" onChange={() => this.onSubjectChange("math-applications")} />
                        <label htmlFor="radio-math-applications">Math<br /> Applications</label>
                        <input type="radio" id="radio-physics" name="essay-subject" onChange={() => this.onSubjectChange("physics")} />
                        <label htmlFor="radio-physics">Physics</label>
                        <input type="radio" id="radio-biology" name="essay-subject" onChange={() => this.onSubjectChange("biology")} />
                        <label htmlFor="radio-biology">Biology</label>
                        <input type="radio" id="radio-english" name="essay-subject" onChange={() => this.onSubjectChange("english")} />
                        <label htmlFor="radio-english">Eng</label>
                        <input type="radio" id="radio-spanish" name="essay-subject" onChange={() => this.onSubjectChange("spanish")} />
                        <label htmlFor="radio-spanish">Spanish</label>
                    </div>;
                break;
            default:
                break;
        }
        const level =
            <div className="radio-wrapper">
                <input type="radio" id="radio-sl" name="essay-level" />
                <label htmlFor="radio-sl">Standard<br /> Level</label>
                <input type="radio" id="radio-hl" name="essay-level" />
                <label htmlFor="radio-hl">Higher<br /> Level</label>
            </div>;
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
                        <form className="order">
                            <h3><strong>Essay type</strong></h3>
                            <div className="radio-wrapper">
                                <input type="radio" id="radio-ia" name="essay-type" onChange={() => this.onTypeChange("ia")} />
                                <label htmlFor="radio-ia">Internal<br /> Assessment</label>
                                <input type="radio" id="radio-ee" name="essay-type" onChange={() => this.onTypeChange("ee")} />
                                <label htmlFor="radio-ee">Extended<br /> Essay</label>
                                <input type="radio" id="radio-ca" name="essay-type" onChange={() => this.onTypeChange("ca")} />
                                <label htmlFor="radio-ca">College<br /> Application</label>
                            </div>
                            {this.state.essayType != "unknown" && this.state.essayType != "ca" ? <h3><strong>Subject</strong></h3> : <></>}
                            {subject}
                            {this.state.essaySubject != "unknown" && this.state.essayType != "ca" ? <><h3><strong>Level</strong></h3>{level}</> : <></>}
                        </form>
                    </div>
                    <p className="copyinfo">© 2021 Ghostwritten</p>
                </div>
            </div >;

        return element;
    }
}
