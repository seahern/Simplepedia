/*
  SectionsView.js

  This module displays the sections and reports when a user clicks on one.

  props:
    sections - an array of section names
    setCurrentSection - a callback that expects a section as an argument

*/
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import ToggleButton from "@mui/material/ToggleButton";
// eslint-disable-next-line import/no-extraneous-dependencies
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function SectionsView({
  sections,
  setCurrentSection,
  currentSection,
}) {
  const sortedSections = [...sections].sort();

  const sectionItems = sortedSections.map((section) => (
    <ToggleButton key={section} data-testid="section" value={section}>
      {section}
    </ToggleButton>
  ));

  const handleChange = (event, newSection) => {
    setCurrentSection(newSection);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      exclusive
      onChange={handleChange}
      size="small"
      value={currentSection}
    >
      {sectionItems}
    </ToggleButtonGroup>
  );
}

SectionsView.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string),
  setCurrentSection: PropTypes.func,
  currentSection: PropTypes.string,
};
