import React from 'react'
import DOMPurify from 'dompurify';

const RichTextRender = ({html}: {html: string}) => {
    const cleanHtml = DOMPurify.sanitize(html);
  return (
    <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
  )
}

export default RichTextRender