# Disclosure Component

A web component for creating collapsible/expandable sections with support for mixed and exclusive modes.

## Usage

```html
<script type="module">
  import { Disclosure } from '@kigumi/components';
</script>

<k-disclosure>
  <div>Section 1 - Title</div>
  <div>Section 1 content</div>
  <div>Section 2 - Title</div>
  <div>Section 2 content</div>
</k-disclosure>
```

The component works with an even number of child elements. Each pair represents a summary and its content.

## Attributes

- `mode` (optional): Expansion mode for sections
  - `"mixed"` (default): Multiple sections can be open simultaneously
  - `"exclusive"`: Only one section can be open at a time
- `icon-name` (optional): Name of the icon to use (default: `"plus"`)
- `icon-position` (optional): Position of the icon relative to the summary content
  - `"end"` (default): Icon positioned at the end (right side)
  - `"start"`: Icon positioned at the start (left side)
- `expanded` (optional): Controls which sections are initially expanded
  - Not set or empty: Opens all sections in mixed mode, or first section in exclusive mode
  - Number (e.g., `"2"`): Opens only the specified section (1-based index)
  - **Note**: Removing the attribute (`removeAttribute('expanded')`) resets to default behavior

## Expansion Control

### Default Behavior

```html
<!-- Opens all sections in mixed mode -->
<k-disclosure>
  <div>Section 1</div>
  <div>Content 1</div>
  <div>Section 2</div>
  <div>Content 2</div>
</k-disclosure>

<!-- Opens only the first section in exclusive mode -->
<k-disclosure mode="exclusive">
  <div>Section 1</div>
  <div>Content 1</div>
  <div>Section 2</div>
  <div>Content 2</div>
</k-disclosure>
```

### Specific Section Expansion

```html
<!-- Opens only section 2 -->
<k-disclosure expanded="2">
  <div>Section 1</div>
  <div>Content 1</div>
  <div>Section 2</div>
  <div>Content 2</div>
  <div>Section 3</div>
  <div>Content 3</div>
</k-disclosure>
```

**Note:** If the specified section number doesn't exist, a warning will be logged to the console and no sections will be opened.

## Icon Customization

You can specify a different icon via the `icon-name` attribute:

```html
<k-disclosure icon-name="chevron-down">
  <div>Section with custom icon</div>
  <div>Section content</div>
</k-disclosure>
```

**Note:** The specified icon must be registered in the `k-icon` component before use.

### Registering Custom Icons

To use custom icons, you need to register them with the Icon component:

```javascript
import { Icon } from '@kigumi/components';

// Register custom icons
Icon.addIconConfig({
  'custom-arrow': () => `<svg>...</svg>`
});

// Use in disclosure
<k-disclosure icon-name="custom-arrow">
  <div>Section</div>
  <div>Content</div>
</k-disclosure>
```

## Events

The disclosure component emits a custom event that can be listened to for integration with other components or analytics.

### Event Types

#### `disclosure-toggle`
Emitted every time a section's state changes (open/close).

```javascript
disclosure.addEventListener('disclosure-toggle', (event) => {
  console.log('Section toggled:', event.detail);
  // event.detail contains: { details, summary, content, groupId, open }

  if (event.detail.open) {
    console.log('Section opened');
  } else {
    console.log('Section closed');
  }
});
```

## Event Detail Structure

All events include a `detail` object with the following properties:

```typescript
interface DisclosureEventDetail {
  details: HTMLDetailsElement;    // The details element that triggered the event
  summary: Element;               // The summary element
  content: Element;               // The content element
  groupId: string;                // The group identifier (for exclusive mode)
  open: boolean;                  // Whether the section is now open
}
```

## Example

### Dynamic Section Control

```javascript
// Change which section is expanded programmatically
const disclosure = document.querySelector('k-disclosure');

// Open section 3
disclosure.setAttribute('expanded', '3');

// Reset to default behavior (depends on mode)
disclosure.removeAttribute('expanded');
// or
disclosure.setAttribute('expanded', '');

// Default behavior:
// - In mixed mode: opens ALL sections
// - In exclusive mode: opens only the FIRST section
```

### Persistence with localStorage

```javascript
disclosure.addEventListener('disclosure-toggle', (event) => {
  localStorage.setItem('disclosure-state', JSON.stringify({
    groupId: event.detail.groupId,
    open: event.detail.open
  }));
});
```
