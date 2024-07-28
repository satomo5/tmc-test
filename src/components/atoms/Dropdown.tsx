/** @jsxImportSource @emotion/react */
import { Dropdown as DropdownMUI, MenuButton } from "@mui/base";
import { Menu } from "@mui/base/Menu";
import { css, MenuItem } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Dropdown component that displays a menu when triggered.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.trigger - The component to trigger the dropdown.
 * @param {Array} props.options - The options to display in the dropdown.
 * @param {ReactNode} props.options[].label - The label for the option.
 * @param {Function} props.options[].onClick - The function to call when the option is clicked.
 * @returns {JSX.Element} The Dropdown component.
 */
export default function Dropdown({
  trigger,
  options,
}: {
  trigger: ReactNode;
  options: {
    label: ReactNode;
    onClick: () => void;
  }[];
}) {
  // State to keep track of whether the dropdown is open.
  const [open, setOpen] = useState(false);

  // Reference to the dropdown element.
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /**
   * Handle click outside the dropdown.
   *
   * @param {MouseEvent} event - The click event.
   */
  const handleClickOutside = (event: MouseEvent) => {
    // If the event target is not within the dropdown, close the dropdown.
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  // Add event listener for click outside the dropdown.
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener on cleanup.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    // Dropdown component from MUI.
    <DropdownMUI open={open}>
      {/* Menu button to trigger the dropdown. */}
      <MenuButton
        css={css`
          border: none;
          width: inherit;
          height: inherit;
          padding: 0;
          background-color: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {/* On click, toggle the dropdown open/close. */}
        <div onClick={() => setOpen(!open)}>{trigger}</div>
      </MenuButton>
      {/* The dropdown menu. */}
      <Menu
        ref={dropdownRef}
        css={css`
          background-color: white;
          border-radius: 5px;
          box-shadow: 0px 3px 4px 0px #031e4061;
          overflow: hidden;
          margin-top: 5px;
          z-index: 120;

          ul {
            padding: 0;
            margin: 0;
          }
        `}
      >
        {/* Map the options to MenuItems. */}
        {options.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </DropdownMUI>
  );
}
