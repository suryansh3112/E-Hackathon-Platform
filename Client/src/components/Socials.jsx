import React from 'react';
import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
const useStyles = makeStyles({
  root: {},
});

function Socials(props) {
  const { linkedin_url, github_url, twitter_url, size = 40 } = props;
  const classes = useStyles({ size });

  return (
    <div className={classes.root}>
      {github_url && (
        <Link href={github_url} target='_blank'>
          <GitHubIcon sx={{ color: '#222', fontSize: size, m: 1 }} />
        </Link>
      )}
      {linkedin_url && (
        <Link href={linkedin_url} target='_blank'>
          <LinkedInIcon sx={{ color: '#0283be', fontSize: size, m: 1 }} />
        </Link>
      )}
      {twitter_url && (
        <Link href={twitter_url} target='_blank'>
          <TwitterIcon sx={{ color: '#1da1f1', fontSize: size, m: 1 }} />
        </Link>
      )}
    </div>
  );
}

export default Socials;
