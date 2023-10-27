import cv2
import numpy as np

def detect_color(frame):
  # Convert the frame to HSV color space.
  hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

  # Threshold the HSV image to detect the red color.
  lower_red = np.array([0, 120, 0])
  upper_red = np.array([10, 255, 100])
  mask = cv2.threshold(hsv, lower_red, upper_red, cv2.THRESH_BINARY)[1]

  return mask

def apply_mask(frame, mask):
  # Apply the mask to the frame.
  masked_frame = cv2.bitwise_and(frame, frame, mask=mask)

  return masked_frame

def combine_frames(frame1, frame2):
  # Combine the two frames.
  combined_frame = cv2.addWeighted(frame1, 0.5, frame2, 0.5, 0)

  return combined_frame

def remove_noise(mask):
  # Remove noise from the mask.
  kernel = np.ones((5, 5), np.uint8)
  eroded_mask = cv2.erode(mask, kernel, iterations=1)
  dilated_mask = cv2.dilate(eroded_mask, kernel, iterations=1)

  return dilated_mask

def main():
  # Initialize the camera.
  cap = cv2.VideoCapture(0)

  # Store a single frame before starting the infinite loop.
  ret, frame = cap.read()
  background = frame

  # Create a mask for the red color.
  mask = detect_color(frame)

  while True:
    # Capture a frame from the camera.
    ret, frame = cap.read()

    # Apply the mask to the frame.
    masked_frame = apply_mask(frame, mask)

    # Combine the masked frame with the background.
    combined_frame = combine_frames(masked_frame, background)

    # Remove noise from the mask.
    eroded_mask = remove_noise(mask)

    # Display the frame.
    cv2.imshow('red cloak', combined_frame)

    # Check if the user wants to quit.
    if cv2.waitKey(1) & 0xFF == ord('q'):
      break

  # Release the camera.
  cap.release()

if __name__ == '__main__':
  main()