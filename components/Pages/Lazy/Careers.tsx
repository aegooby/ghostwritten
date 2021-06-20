
import * as React from "react";

import * as Loading from "../../Loading.tsx";

export default function Careers()
{
    Loading.useFinishLoading();
    const element: React.ReactElement =
        <div className="wrapper">
            <div className="page">
                <div className="main-text">
                    <p>
                        If you are a recent high school or college graduate looking
                        to join our team as one of the following, send us an email
                        at <a href="mailto:ghostwrittenhq@gmail.com">ghostwrittenhq@gmail.com</a> with
                        your resume attached.
                    </p>
                    <h1>Writers</h1>
                    <p>
                        Are you a wordsmith who just can't put down the pen?
                        We are looking for talented writers who enjoy editing
                        and research.
                    </p>
                    <h1>Tutors</h1>
                    <p>
                        Do you enjoy working with students face-to-face and watching
                        them become a top scorer with your guidance? We are hiring
                        motivated tutors in all subject areas.
                    </p>
                    <h1>Referral Agents</h1>
                    <p>
                        Do you know anyone who could use our services to take their
                        academics to the next level? If you join our referral program,
                        you can make commissions on every customer you refer to us.
                    </p>
                </div>
            </div>
        </div >;
    return element;
}
