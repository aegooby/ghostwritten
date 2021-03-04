
import * as React from "react";
import * as ReactPopup from "react-popup";

export default class Form extends React.Component<unknown, unknown>
{
    constructor(props: unknown)
    {
        super(props);
    }
    render(): React.ReactElement
    {
        return (
            <ReactPopup.Popup trigger={<button>Get Started</button>} modal>
                {(close: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
            </button>
                        <div className="header"> Modal Title </div>
                        <div className="content">
                            {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
              Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
              delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
              <br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
              commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
              explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
            </div>
                        <div className="actions">

                            <button
                                className="button"
                                onClick={() =>
                                {
                                    console.log('modal closed ');
                                    close();
                                }}
                            >
                                close modal
              </button>
                        </div>
                    </div>
                )}
            </ReactPopup.Popup>
        );
    }
}
