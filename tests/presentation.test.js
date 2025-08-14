// TruthRise Pitch Deck Presentation Test
// This test checks that all slides in Presentation.html are present and contain expected key content.

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const presentationPath = path.join(__dirname, '../Pages/Presentation.html');
const html = fs.readFileSync(presentationPath, 'utf8');

function checkSlide(title, keywords = []) {
  assert(html.includes(title), `Slide with title '${title}' not found.`);
  for (const kw of keywords) {
    assert(html.includes(kw), `Keyword '${kw}' not found in slide '${title}'.`);
  }
}

describe('TruthRise Pitch Deck Slides', () => {
  it('Slide 1: The Problem', () => {
    checkSlide('Online Fraud: A Growing Crisis in Europe', [
      'alert-triangle', 'search', 'trending-down', 'user-x', 'file-text', 'eu-map.png', 'Victims deserve better.'
    ]);
  });

  it('Slide 2: The TruthRise Vision', () => {
    checkSlide('A Civic Infrastructure for Digital Justice', [
      'Victims', 'Contributors', 'Institutions', 'Frameworks', 'Connected by civic participation'
    ]);
  });

  it('Slide 3: Market Failure', () => {
    checkSlide('Market Failure', [
      'Failures', 'TruthRise', 'Hotlines don’t scale', 'Structured onboarding'
    ]);
  });

  it('Slide 4: The TruthRise Approach', () => {
    checkSlide('The TruthRise Approach', [
      'Onboard', 'Report', 'Validate', 'Escalate', 'Resolve', 'approach-list'
    ]);
  });

  it('Slide 5: EU 2030 Agenda Alignment', () => {
    checkSlide('EU Digital Decade 2030 Alignment', [
      'Digital Skills', 'Digital Infrastructures', 'Digitalization of Businesses', 'Consumer Protection', 'Cybersecurity'
    ]);
  });

  it('Slide 6: Business & Licensing Model', () => {
    checkSlide('Business & Licensing Model', [
      'Institutional Licensing', 'Case Sponsorships', 'Premium Services', 'Fiat-to-credit', 'Civic infrastructure'
    ]);
  });

  it('Slide 7: Social & Economic Impact', () => {
    checkSlide('Social & Economic Impact', [
      'Victim', 'Contributor', 'Institution', 'Recovery rate', 'Scams exposed'
    ]);
  });

  it('Slide 8: Platform Governance', () => {
    checkSlide('Platform Governance', [
      'What does governance mean?', 'Ethical Charter', 'Multi-role Ecosystem', 'Anti-exploitation Rules', 'Reputation-based Access', 'Admin Accountability', 'Governed by the people'
    ]);
  });

  it('Slide 9: Roadmap & Milestones', () => {
    checkSlide('Roadmap & Milestones', [
      'MVP Launch', 'Q1–Q2 2026', 'Q3–Q4 2026', '2027', '2028', 'Case Submission Flow'
    ]);
  });

  it('Slide 10: Call for Collaboration', () => {
    checkSlide('Join TruthRise: Build Digital Justice for Europe.', [
      'Regulators', 'Law Firms', 'Grants & Institutions', 'Policy Makers', 'info@truthrise.io'
    ]);
  });
});
