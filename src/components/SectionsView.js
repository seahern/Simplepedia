/*
  SectionsView.js

  This module displays the sections and reports when a user clicks on one.

  props:
    sections - an array of section names
    setCurrentSection - a callback that expects a section as an argument

*/
import PropTypes from "prop-types";
import styles from "../styles/SectionsView.module.css";

export default function SectionsView({ sections, setCurrentSection }) {
  const sortedSections = [...sections].sort();

  const sections1 = sortedSections.map((object) => (
    <li
      key={object.charAt(0)}
      data-testid="section"
      onClick={() => {
        setCurrentSection(object);
      }}
    >
      {object}
    </li>
  ));

  return (
    <div className={styles.sectionList}>
      {" "}
      <ul> {sections1} </ul>{" "}
    </div>
  );
}

SectionsView.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string),
  setCurrentSection: PropTypes.func,
};
