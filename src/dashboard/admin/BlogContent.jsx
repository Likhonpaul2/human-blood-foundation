import React from 'react';

const BlogContent = ({content}) => {
    return (
        <div>
            <div
                className="prose max-w-none" // Optional Tailwind style for formatting
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default BlogContent;