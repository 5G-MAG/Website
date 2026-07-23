import styles from './styles.module.css';

// Brevo's hosted iframe embed, instead of a plain-HTML form POST: Brevo
// serves the whole form (fields, consent checkbox, submit button, and its
// own success state) inside this iframe, so a successful subscribe shows
// Brevo's "thanks" message right there on the page -- no page navigation to
// sibforms.com, and no dependency on configuring a post-submit redirect URL
// in the Brevo dashboard (the previous plain-form approach needed that
// redirect set up before it could show an in-page "thanks" message; this
// embed needs no such setup).
const BREVO_IFRAME_SRC =
  'https://dd85197b.sibforms.com/v2/serve/MUIFAJPWJ83cuZLyZMLuWdiDW5YDuRAfW-mqkFl77d-bYRblU_BUMfWByjAU3viXpN9W1IGGnKc0f8ukFq7cNI8HMklNtww-gGYQ_Yrmu5WHyikzPfq4kqpoFfh5AVRFrLAUtmAY6qAp_dx2AgE1r4Ny8nUmwUiB5MjjshDs7uq7wO24QPWfdgLF-8dMIV6Is-g-wG0tBlsmWJUvWg==';

export default function NewsletterForm() {
  return (
    <div>
      <iframe
        className={styles.iframe}
        src={BREVO_IFRAME_SRC}
        width="100%"
        height="750"
        frameBorder="0"
        scrolling="auto"
        allowFullScreen
        title="5G-MAG Update! sign up"
      />
      <p className={styles.fallback}>
        Form not showing up? Some browsers block embedded signup forms —{' '}
        <a href={BREVO_IFRAME_SRC} target="_blank" rel="noreferrer">
          open the subscribe form directly
        </a>
        .
      </p>
    </div>
  );
}
