import React from 'react';

// SVG for the logo text only
export const logoSvg = (
  <svg viewBox="0 0 150 60" xmlns="http://www.w3.org/2000/svg">
    {/* Claube Text only */}
    <text x="10" y="37" fontFamily="EB Garamond, serif" fontSize="36" fill="#FAF8F4">Claube</text>
  </svg>
);

// SVG for the send button
export const sendSvg = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E05B32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"/>
  </svg>
);

// SVG for the AI avatar
export const aiAvatarSvg = (
  <svg width="24" height="24" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(20, 20)">
      <path d="M0,0 L10,0 M0,0 L-10,0 M0,0 L7.07,7.07 M0,0 L-7.07,-7.07 M0,0 L7.07,-7.07 M0,0 L-7.07,7.07 M0,0 L0,10 M0,0 L0,-10" 
            stroke="#E05B32" strokeWidth="2" strokeLinecap="round"/>
    </g>
  </svg>
);

// SVG for the add content button
export const addContentSvg = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21V3h18v18H3z"/>
    <path d="M8 12h8M12 8v8"/>
  </svg>
);

// SVG for share button - X logo
export const xLogoSvg = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#E05B32">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// SVG for X modal logo
export const xModalLogoSvg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FAF8F4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// SVG for settings icon
export const settingsSvg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E05B32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

// SVG for trash/clear icon
export const trashSvg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E05B32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);