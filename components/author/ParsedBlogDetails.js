import parse from 'html-react-parser'

const ParsedBlogDetails = ({data}) => {
    return (
        <div className="parsedBlogDetails">
            {parse(data)}
        </div>
    )
}

export default ParsedBlogDetails