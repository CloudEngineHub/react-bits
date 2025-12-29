import { diamondSponsors, platinumSponsors, silverSponsors } from '../../../constants/Sponsors';
import { Gem, Crown, Medal, ArrowRight } from 'lucide-react';
import './Sponsors.css';

const buildSponsorUrl = (url, tier) => {
  if (!url) return null;
  try {
    const sponsorUrl = new URL(url);
    sponsorUrl.searchParams.set('utm_source', 'reactbits');
    sponsorUrl.searchParams.set('utm_medium', 'sponsor');
    sponsorUrl.searchParams.set('utm_campaign', tier);
    sponsorUrl.searchParams.set('ref', 'reactbits');
    return sponsorUrl.toString();
  } catch {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}utm_source=reactbits&utm_medium=sponsor&utm_campaign=${tier}&ref=reactbits`;
  }
};

const DiamondSponsor = ({ sponsor }) => {
  const content = (
    <div className={`sponsor-card sponsor-card--diamond${sponsor.imageUrl ? '' : ' sponsor-card--placeholder'}`}>
      {sponsor.imageUrl ? (
        <img src={sponsor.imageUrl} alt={sponsor.name} title={sponsor.name} />
      ) : (
        <div className="sponsor-placeholder">
          <span className="sponsor-placeholder-text">Available</span>
        </div>
      )}
    </div>
  );

  if (sponsor.url) {
    return (
      <a
        href={buildSponsorUrl(sponsor.url, 'diamond')}
        target="_blank"
        rel="noopener noreferrer"
        className="sponsor-card-link"
      >
        {content}
      </a>
    );
  }

  return content;
};

const PlatinumSponsor = ({ sponsor }) => {
  const content = (
    <div className={`sponsor-card sponsor-card--platinum${sponsor.imageUrl ? '' : ' sponsor-card--placeholder'}`}>
      {sponsor.imageUrl ? (
        <img src={sponsor.imageUrl} alt={sponsor.name} title={sponsor.name} />
      ) : (
        <div className="sponsor-placeholder">
          <span className="sponsor-placeholder-text">Available</span>
        </div>
      )}
    </div>
  );

  if (sponsor.url) {
    return (
      <a
        href={buildSponsorUrl(sponsor.url, 'platinum')}
        target="_blank"
        rel="noopener noreferrer"
        className="sponsor-card-link"
      >
        {content}
      </a>
    );
  }

  return content;
};

const SilverSponsor = ({ sponsor }) => {
  const content = (
    <div className={`sponsor-card sponsor-card--silver${sponsor.imageUrl ? '' : ' sponsor-card--placeholder'}`}>
      {sponsor.imageUrl ? (
        <img src={sponsor.imageUrl} alt={sponsor.name} title={sponsor.name} />
      ) : (
        <span className="sponsor-placeholder-mini"></span>
      )}
    </div>
  );

  if (sponsor.url) {
    return (
      <a
        href={buildSponsorUrl(sponsor.url, 'silver')}
        target="_blank"
        rel="noopener noreferrer"
        className="sponsor-card-link"
      >
        {content}
      </a>
    );
  }

  return content;
};

const Sponsors = () => {
  const displayDiamond =
    diamondSponsors.length > 0
      ? diamondSponsors
      : [
          { id: 'diamond-placeholder-1', name: 'Diamond Sponsor' },
          { id: 'diamond-placeholder-2', name: 'Diamond Sponsor' }
        ];

  const displayPlatinum =
    platinumSponsors.length > 0
      ? platinumSponsors
      : Array.from({ length: 4 }, (_, i) => ({
          id: `platinum-placeholder-${i}`,
          name: 'Platinum Sponsor'
        }));

  const displaySilver =
    silverSponsors.length > 0
      ? silverSponsors
      : Array.from({ length: 8 }, (_, i) => ({
          id: `silver-placeholder-${i}`,
          name: 'Silver Sponsor'
        }));

  return (
    <section className="sponsors-section">
      <div className="sponsors-container">
        {/* Header - Centered */}
        <div className="sponsors-header">
          <h2 className="sponsors-title">Our Sponsors</h2>
          <p className="sponsors-subtitle">Backed by amazing companies and developers who believe in open source</p>
        </div>

        {/* Tiers - Left Aligned */}
        <div className="sponsors-tiers">
          {/* Diamond Tier */}
          <div className="sponsors-tier">
            <div className="tier-header">
              <div className="tier-badge tier-badge--diamond">
                <Gem size={14} />
                <span>Diamond</span>
              </div>
            </div>
            <div className="tier-grid tier-grid--diamond">
              {displayDiamond.map(sponsor => (
                <DiamondSponsor key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>

          {/* Platinum Tier */}
          <div className="sponsors-tier">
            <div className="tier-header">
              <div className="tier-badge tier-badge--platinum">
                <Crown size={14} />
                <span>Platinum</span>
              </div>
            </div>
            <div className="tier-grid tier-grid--platinum">
              {displayPlatinum.map(sponsor => (
                <PlatinumSponsor key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>

          {/* Silver Tier */}
          <div className="sponsors-tier">
            <div className="tier-header">
              <div className="tier-badge tier-badge--silver">
                <Medal size={14} />
                <span>Silver</span>
              </div>
            </div>
            <div className="tier-grid tier-grid--silver">
              {displaySilver.map(sponsor => (
                <SilverSponsor key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="sponsors-cta">
          <a
            href="mailto:contact@davidhaz.com?subject=React%20Bits%20Sponsorship%20Inquiry"
            className="sponsors-cta-button"
          >
            <span>Become a Sponsor</span>
            <ArrowRight size={18} />
          </a>
          <p className="sponsors-cta-text">
            Get your brand in front of <strong>500K+</strong> developers monthly
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
