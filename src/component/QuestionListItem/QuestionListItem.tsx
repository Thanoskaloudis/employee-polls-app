import {ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {useNavigate, generatePath} from "react-router-dom";
import { QuestionListItemProps } from "../../utils/models";

const QuestionListItem = ({question}: QuestionListItemProps) => {
    const navigate = useNavigate();

    const handleClick = () => navigate(
        generatePath('/questions/:question', {question: question.id})
    );

    return (
        <ListItem alignItems="flex-start" button onClick={handleClick} sx={{ bgcolor: 'white', width: '25rem', height: '10rem' }}>
            <ListItemAvatar>
                <Avatar alt={question.authorObject.name} src={question.authorObject.avatarURL || ''}/>
            </ListItemAvatar>
            <ListItemText
                primary={`Would you rather ${question.optionOne.text} or ${question.optionTwo.text}`}
                secondary={
                    <>
                        <Typography
                            sx={{display: 'inline'}}
                            component="span"
                            color="text.primary"
                        >
                            {question.authorObject.name} asked
                        </Typography>
                        &nbsp;on&nbsp;
                        {(new Date(question.timestamp).toLocaleString())}
                    </>
                }
            />
        </ListItem>
    );
}

export default QuestionListItem;
