import React from "react";

const InfoItem = (props) => {
    return (
        <div className="info-item">
            <h3>{props.name.toUpperCase()}</h3>
            {props.array ?
                (props.array.map(element => (<p className="info" key={element.id}>{element.name}</p>)))
                : (
                    <p>Loading...</p>
                )}
        </div>
    )
}

export default InfoItem;