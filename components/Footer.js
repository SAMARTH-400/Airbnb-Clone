import styled from "styled-components";

export default function Footer() {
  return (
    <FooterSection className="drop-shadow-xlshadow">
      <div className="footerInner">
        <span>
          <h2>About</h2>
          <ul>
            <li>How Airbnb works</li>
            <li>Newsroom</li>
            <li>Airbnb 2021</li>
            <li>Investors</li>
            <li>Airbnb Plus</li>
            <li>Airbnb Luxe</li>
            <li className="lg-hidden">HotelTonight</li>
            <li className="lg-hidden">Airbnb for Work</li>
            <li className="lg-hidden">Made possible by Hosts</li>
            <li className="lg-hidden">Careers</li>
            <li className="lg-hidden">Founders&apos; Letter</li>
          </ul>
        </span>
        <span>
          <h2>Community</h2>
          <ul>
            <li>Diversity & Belonging</li>
            <li>Accessibility</li>
            <li>Airbnb Associates</li>
            <li>Frontline Stays</li>
            <li>Guest Referrals</li>
            <li>Airbnb.org</li>
          </ul>
        </span>
        <span>
          <h2>Host</h2>
          <ul>
            <li>Host your home</li>
            <li>Host an Online Experience</li>
            <li>Host an Experience</li>
            <li>Responsible hosting</li>
            <li>Resource Centre</li>
            <li>Community Centre</li>
          </ul>
        </span>
        <span>
          <h2>Support</h2>
          <ul>
            <li>Our COVID-19 Response</li>
            <li>Help Centre</li>
            <li>Cancellation options</li>
            <li>Neighbourhood Support</li>
            <li>Trust & Safety</li>
          </ul>
        </span>
      </div>
    </FooterSection>
  );
}

const FooterSection = styled.footer`
  margin-top: 2rem;

  padding: 3rem var(--sidePadding);
  background: #efeff5;
  border-top-width: 1px;
  padding-top: 2rem;
  padding-bottom: 2rem;
  h2 {
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    font-weight: 800;
  }
  .footerInner {
    & > span {
      display: flex;
      flex-direction: column;
      padding: 1.5rem 0;
    }
    & > span + span {
      border-top: 1px solid #0002;
    }
    & > span:first-of-type {
      padding-top: 0;
    }
    & > span:last-of-type {
      padding-bottom: 0;
    }
    ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      li {
        padding: 0.25rem 0;
        font-size: 0.85rem;
        cursor: pointer;
        opacity: 0.8;
        transition: all 0.2s;
        width: fit-content;
        &:hover {
          opacity: 1;
          text-decoration: underline;
        }
      }
    }
    .footer-bottom {
      display: flex;
      flex-direction: row-reverse;
      align-items: flex-end;
      justify-content: space-between;
      a {
        margin-left: 0.5rem;
      }
      a:hover {
        text-decoration: underline;
        color: var(--red);
      }
      svg {
        height: 1rem;
      }
      svg.globe {
        margin-right: 0.1rem;
      }
      svg.dollar {
        margin-right: -0.1rem;
      }
      span + span {
        margin-left: 1rem;
      }
      p,
      span {
        display: flex;
        align-items: center;
      }
    }
  }
  @media (max-width: 36rem) {
    .footerInner .footer-bottom {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  }
  @media (min-width: 81rem) {
    .footerInner {
      display: flex;
      flex-flow: row wrap;
      max-width: 1200px;
      margin: 0 auto;
      justify-content: space-between;
      .footer-bottom {
        flex: 0 0 100%;
        padding-top: 1.5rem;
        margin-top: 1.5rem;
      }
      .lg-hidden {
        display: none;
      }
      & > span:not(.footer-bottom) {
        padding: 0;
        border-top: none !important;
      }
    }
    *,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --red: #e0565b;
  --yellow: #ffffd6;
  --dark: #2e2e48;
  --brown: #3f3f1a;
  --light: #fafafc;
  --gray: #efeff5;
  --white: #fff;
  --sidePadding: 3rem;
  --maxWidth: 40%;
  --containerWidth: 1200px;
}
body.dark {
  --dark: #fafafc;
  --white: #112;
  --light: #1e1e38;
  --gray: #002;
}
body.dark section.light {
  --light: #fafafc;
  --dark: #2e2e48;
}
body.dark .mapboxgl-popup {
  --dark: #2e2e48;
  --white: #fff;
}
body.dark .mapgl-container {
  filter: invert(100%) hue-rotate(180deg);
}

body {
  font-family: "Nunito Sans", sans-serif;
  background: var(--light);
  color: var(--dark);
  line-height: 1.5;
  -webkit-tap-highlight-color: transparent;
  font-size: 1rem;
}

input,
a,
button {
  font-family: inherit;
  color: inherit;
  text-decoration: none;
}
::selection {
  color: var(--light);
  background: var(--red);
}

.btn {
  --color: var(--dark);
  --bgcolor: var(--light);
  display: inline-block;
  white-space: nowrap;
  padding: 0.75rem 1.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color);
  background: var(--bgcolor);
  border-radius: 0.66rem;
  transition: all 0.2s;
  box-shadow: 0 0.5rem 1.5rem -0.5rem currentColor;
}
.btn.btn-dark {
  --color: var(--light);
  --bgcolor: var(--dark);
}

.btn:hover,
.btn:focus {
  box-shadow: 0 0 0 2px var(--color), 0 0 0 4px var(--bgcolor);
}
.btn:active {
  transform: scale(0.95);
}

section:not(.hero) {
  margin: 3rem var(--sidePadding) 0;
}
section:last-of-type {
  margin-bottom: 3rem;
}
section h2 {
  font-weight: 800;
  font-size: 1.75rem;
}

#nprogress .bar {
  background: var(--red);
}

#nprogress .peg {
  box-shadow: 0 0 10px var(--red), 0 0 5px var(--red);
}

@media (max-width: 36rem) {
  :root {
    --sidePadding: 1.5rem;
    --maxWidth: 100%;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  section h2 {
    font-size: 1.5rem;
  }
}

@media (min-width: 48rem) {
  html {
    font-size: 17px;
  }
}

@media (min-width: 81rem) {
  html {
    font-size: 18px;
  }
  section:not(.hero) {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
}
  }
`;