import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import './index.css';

registerBlockType("ourplugin/word-count", {
    title: "Word Count",
    icon: "smiley",
    category: "common",
    attributes:{
        wordCount: {type: "string"},
    },
    edit: (props) => {
        const [wordCount, setWordCount] = useState(0);

        // Use the useSelect hook to get the post content
        const postContent = useSelect((select) => {
            return select('core/editor').getEditedPostContent();
        }, []);

        const extractTextFromPTags = (htmlString) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            const pTags = doc.querySelectorAll('p');
            let textContent = '';
            pTags.forEach(p => {
                textContent += p.textContent + '';
            });
            return textContent.trim();
        };

        useEffect(() => {
            const textContent = extractTextFromPTags(postContent);
            const count = textContent ? textContent.replace(/\s+/g, '')?.length : 0;
            console.log(count);
            props.setAttributes({wordCount: count});
            setWordCount(count);
        }, [postContent]);

        return (
            <div>
                <p>Word Count: {props.attributes.wordCount}</p>
            </div>
        );
    },
    save: (props) => {
        return null;
    },
});
