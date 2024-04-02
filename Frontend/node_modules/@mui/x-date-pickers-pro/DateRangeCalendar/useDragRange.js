import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import { isEndOfRange, isStartOfRange } from '../internals/utils/date-utils';
const resolveDateFromTarget = (target, utils, timezone) => {
  const timestampString = target.dataset.timestamp;
  if (!timestampString) {
    return null;
  }
  const timestamp = +timestampString;
  return utils.date(new Date(timestamp).toISOString(), timezone);
};
const isSameAsDraggingDate = event => {
  const timestampString = event.target.dataset.timestamp;
  return timestampString === event.dataTransfer.getData('draggingDate');
};
const resolveButtonElement = element => {
  if (element) {
    if (element instanceof HTMLButtonElement && !element.disabled) {
      return element;
    }
    if (element.children.length) {
      return resolveButtonElement(element.children[0]);
    }
    return null;
  }
  return element;
};
const resolveElementFromTouch = (event, ignoreTouchTarget) => {
  // don't parse multi-touch result
  if (event.changedTouches?.length === 1 && event.touches.length <= 1) {
    const element = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    // `elementFromPoint` could have resolved preview div or wrapping div
    // might need to recursively find the nested button
    const buttonElement = resolveButtonElement(element);
    if (ignoreTouchTarget && buttonElement === event.changedTouches[0].target) {
      return null;
    }
    return buttonElement;
  }
  return null;
};
const useDragRangeEvents = ({
  utils,
  setRangeDragDay,
  setIsDragging,
  isDragging,
  onDatePositionChange,
  onDrop,
  disableDragEditing,
  dateRange,
  timezone
}) => {
  const emptyDragImgRef = React.useRef(null);
  React.useEffect(() => {
    // Preload the image - required for Safari support: https://stackoverflow.com/a/40923520/3303436
    emptyDragImgRef.current = document.createElement('img');
    emptyDragImgRef.current.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }, []);
  const isElementDraggable = day => {
    if (day == null) {
      return false;
    }
    const shouldInitDragging = !disableDragEditing && !!dateRange[0] && !!dateRange[1];
    const isSelectedStartDate = isStartOfRange(utils, day, dateRange);
    const isSelectedEndDate = isEndOfRange(utils, day, dateRange);
    return shouldInitDragging && (isSelectedStartDate || isSelectedEndDate);
  };
  const handleDragStart = useEventCallback(event => {
    const newDate = resolveDateFromTarget(event.target, utils, timezone);
    if (!isElementDraggable(newDate)) {
      return;
    }
    event.stopPropagation();
    if (emptyDragImgRef.current) {
      event.dataTransfer.setDragImage(emptyDragImgRef.current, 0, 0);
    }
    setRangeDragDay(newDate);
    event.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
    const buttonDataset = event.target.dataset;
    if (buttonDataset.timestamp) {
      event.dataTransfer.setData('draggingDate', buttonDataset.timestamp);
    }
    if (buttonDataset.position) {
      onDatePositionChange(buttonDataset.position);
    }
  });
  const handleTouchStart = useEventCallback(event => {
    const target = resolveElementFromTouch(event);
    if (!target) {
      return;
    }
    const newDate = resolveDateFromTarget(target, utils, timezone);
    if (!isElementDraggable(newDate)) {
      return;
    }
    setRangeDragDay(newDate);
  });
  const handleDragEnter = useEventCallback(event => {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
    setRangeDragDay(resolveDateFromTarget(event.target, utils, timezone));
  });
  const handleTouchMove = useEventCallback(event => {
    const target = resolveElementFromTouch(event);
    if (!target) {
      return;
    }
    const newDate = resolveDateFromTarget(target, utils, timezone);
    if (newDate) {
      setRangeDragDay(newDate);
    }

    // this prevents initiating drag when user starts touchmove outside and then moves over a draggable element
    const targetsAreIdentical = target === event.changedTouches[0].target;
    if (!targetsAreIdentical || !isElementDraggable(newDate)) {
      return;
    }

    // on mobile we should only initialize dragging state after move is detected
    setIsDragging(true);
    const button = event.target;
    const buttonDataset = button.dataset;
    if (buttonDataset.position) {
      onDatePositionChange(buttonDataset.position);
    }
  });
  const handleDragLeave = useEventCallback(event => {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  });
  const handleDragOver = useEventCallback(event => {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
  });
  const handleTouchEnd = useEventCallback(event => {
    if (!isDragging) {
      return;
    }
    setRangeDragDay(null);
    setIsDragging(false);
    const target = resolveElementFromTouch(event, true);
    if (!target) {
      return;
    }

    // make sure the focused element is the element where touch ended
    target.focus();
    const newDate = resolveDateFromTarget(target, utils, timezone);
    if (newDate) {
      onDrop(newDate);
    }
  });
  const handleDragEnd = useEventCallback(event => {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    setRangeDragDay(null);
  });
  const handleDrop = useEventCallback(event => {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    setRangeDragDay(null);
    // make sure the focused element is the element where drop ended
    event.currentTarget.focus();
    if (isSameAsDraggingDate(event)) {
      return;
    }
    const newDate = resolveDateFromTarget(event.target, utils, timezone);
    if (newDate) {
      onDrop(newDate);
    }
  });
  return {
    onDragStart: handleDragStart,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    onDrop: handleDrop,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
};
export const useDragRange = ({
  disableDragEditing,
  utils,
  onDatePositionChange,
  onDrop,
  dateRange,
  timezone
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [rangeDragDay, setRangeDragDay] = React.useState(null);
  const handleRangeDragDayChange = useEventCallback(val => {
    if (!utils.isEqual(val, rangeDragDay)) {
      setRangeDragDay(val);
    }
  });
  const draggingDatePosition = React.useMemo(() => {
    const [start, end] = dateRange;
    if (rangeDragDay) {
      if (start && utils.isBefore(rangeDragDay, start)) {
        return 'start';
      }
      if (end && utils.isAfter(rangeDragDay, end)) {
        return 'end';
      }
    }
    return null;
  }, [dateRange, rangeDragDay, utils]);
  const dragRangeEvents = useDragRangeEvents({
    utils,
    onDatePositionChange,
    onDrop,
    setIsDragging,
    isDragging,
    setRangeDragDay: handleRangeDragDayChange,
    disableDragEditing,
    dateRange,
    timezone
  });
  return React.useMemo(() => _extends({
    isDragging,
    rangeDragDay,
    draggingDatePosition
  }, !disableDragEditing ? dragRangeEvents : {}), [isDragging, rangeDragDay, draggingDatePosition, disableDragEditing, dragRangeEvents]);
};