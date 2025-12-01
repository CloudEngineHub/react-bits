import './AnnouncementBar.css';
import { Icon } from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';
import { RiSparklingFill } from 'react-icons/ri';

const AnnouncementBar = ({ message, link, linkText, backgroundColor, noBorder }) => {
  const content = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon as={RiSparklingFill} color="#FF9FFC" boxSize="14px" className="header-announcement-icon" />
      <span className="header-announcement-message">
        {message}
        {linkText && (
          <>
            {' '}
            <span className="header-announcement-link-text">{linkText}</span>{' '}
            <Icon
              as={LuArrowRight}
              boxSize="14px"
              style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }}
            />
          </>
        )}
      </span>
    </div>
  );

  const style = {
    ...(backgroundColor ? { background: backgroundColor } : {}),
    ...(noBorder ? { borderBottom: 'none' } : {})
  };

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="header-announcement-bar" style={style}>
        <div className="header-announcement-content">{content}</div>
      </a>
    );
  }

  return (
    <div className="header-announcement-bar" style={style}>
      <div className="header-announcement-content">{content}</div>
    </div>
  );
};

export default AnnouncementBar;
