// Animate scale, opacity, and rotation
useFrame((state, delta) => {
  if (!group.current) return;

  // Animate X-axis rotation for tilting in the opposite direction
  const targetRotationX = -Math.PI / 12; // -15 degrees
  if (group.current.rotation.x > targetRotationX) {
    const newRotation = group.current.rotation.x + (targetRotationX * delta); // Adding a negative value
    group.current.rotation.x = Math.max(newRotation, targetRotationX);
  }

  const targetScale = 7.088; // 0.443 * 16
  // Animate scale
  if (group.current.scale.x > targetScale) {
    const newScale = group.current.scale.x - (targetScale * delta);
    group.current.scale.x = Math.max(newScale, targetScale);
    group.current.scale.y = Math.max(newScale, targetScale);
    group.current.scale.z = Math.max(newScale, targetScale);
  }

  // Animate opacity
  const targetOpacity = 0.5;
  if (group.current.material.opacity > targetOpacity) {
    const newOpacity = group.current.material.opacity - (targetOpacity * delta);
    group.current.material.opacity = Math.max(newOpacity, targetOpacity);
  }
}); 