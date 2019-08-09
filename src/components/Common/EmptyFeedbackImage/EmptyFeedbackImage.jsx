import React from "react"
import emptyFeedbackSvg from "./empty_feedback.svg"
import { styled } from '@material-ui/styles';

const EmptyFeedbackImage = ({alt, ...rest}) => <Img src={emptyFeedbackSvg} alt={alt} {...rest} />

EmptyFeedbackImage.defaultProps = {
    alt: "Empty feedback"
}

export default EmptyFeedbackImage

const Img = styled("img")({
    width: "100%",
    height: "auto",
    margin: "0 auto",
    maxWidth: "500px"
})